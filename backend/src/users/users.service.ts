import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { User } from './user.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConflictException } from '../errors/conflict.exception';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
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
    return this.usersRepository.save(obj);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.usersRepository.findOne(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.usersRepository.delete(id);
  }
}
