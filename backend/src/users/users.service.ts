import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';
import { UserActions } from '../users/user-actions.entity';
import { ValidationToken } from './validation-token.entity';
import * as bcrypt from 'bcryptjs';

import { MailService } from 'src/mail/mail.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { ConflictException } from '../errors/conflict.exception';
import { NotFoundException } from 'src/errors/not-found.exception';
import { UnauthorizedException } from 'src/errors/unauthorized.exception';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserActions)
    private userActionsRepository: Repository<UserActions>,
    @InjectRepository(ValidationToken)
    private validationTokenRepository: Repository<ValidationToken>,
    private readonly mailService: MailService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    const foundUser = await this.usersRepository.findOne({
      where: [
        { email: createUserDto.email },
        { user_name: createUserDto.user_name },
      ],
    });

    if (foundUser) {
      if (
        foundUser.email === createUserDto.email &&
        foundUser.user_name === createUserDto.user_name
      ) {
        throw new ConflictException('Username and email address already used.');
      } else if (foundUser.email === createUserDto.email) {
        throw new ConflictException('Email address already used.');
      } else if (foundUser.user_name === createUserDto.user_name) {
        throw new ConflictException('Username already used.');
      }
    }

    const obj = this.usersRepository.create(createUserDto); // activate BeforeInsert for password hashing
    const savedUser = await this.usersRepository.save(obj); // Save user

    //---------------------------------------------------------------------------
    // Create a repository for user account actions Ex: Recover tokens, Login time. Related with this account
    const userActions = this.userActionsRepository.create({ user: savedUser });
    const savedUserActions = await this.userActionsRepository.save(userActions);

    const validationToken = this.validationTokenRepository.create({ user_actions: savedUserActions });
    await this.validationTokenRepository.save(validationToken) // create validatedTokens table

    await this.mailService.confirmEmailNotification(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    const foundUser = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .addSelect('user.password')
      .getOne();

    if (!foundUser) {
      throw new UnauthorizedException('User not found.');
    }

    // Caso exiga a troca do email
    if (updateUserDto.email) {
      const foundUserWithSameEmail = await this.usersRepository.findOne({
        where: { email: updateUserDto.email },
      });

      if (foundUserWithSameEmail) {
        throw new ConflictException('Email address already used.');
      }

      // exiga a senha do usuário 
      // PARA TER A CERTEZA DE QUE ESTE USUÁRIO SEJA REALMENTE O DONO DA CONTA PARA FAZER A ALTERAÇÃO!
      const passwordMatched = await bcrypt.compare(
        updateUserDto.password,
        foundUser.password,
      );

      if (!passwordMatched) {
        throw new UnauthorizedException('Incorrect credentials.');
      }

      return await this.usersRepository.update(id, updateUserDto);
    
    // Caso exiga a troca da senha
    } else if (updateUserDto.password) {
      const foundUser = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .addSelect('user.password')
      .getOne();

      if (!foundUser) {
        throw new UnauthorizedException('User not found.');
      }

      const passwordMatched = await bcrypt.compare(
        updateUserDto.password,
        foundUser.password,
      );

      if (!passwordMatched) {
        throw new UnauthorizedException('Incorrect credentials.');
      }

      const updateInstance = this.usersRepository.create({password: updateUserDto.newPassword});

      return await this.usersRepository.update(id, updateInstance);
    } else {
      // Conteúdos menos sensíveis podem ser alterados facilmente
      return await this.usersRepository.update(id, updateUserDto);
    }
  }
}
