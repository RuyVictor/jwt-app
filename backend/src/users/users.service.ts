import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { User } from './user.entity';
import { UserActions } from 'src/mail/user-actions.entity';

import { MailService } from 'src/mail/mail.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { ConflictException } from '../errors/conflict.exception';
import { NotFoundException } from 'src/errors/not-found.exception';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserActions)
    private userActionsRepository: Repository<UserActions>,
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

    // Create a repository for user account actions only Ex: Recover tokens, Login time.
    let userActions = this.userActionsRepository.create({ user: savedUser });
    await this.userActionsRepository.save(userActions);

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
    const user = await this.usersRepository.update(id, updateUserDto);

    if (user.affected === 0) {
      throw new NotFoundException();
    }

    return user;
  }

  async delete(id: string): Promise<DeleteResult> {
    const user = await this.usersRepository.delete(id);

    if (user.affected === 0) {
      throw new NotFoundException();
    }

    return user;
  }
}
