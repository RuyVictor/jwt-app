import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { LoginUserDto } from './dto/login-user.dto';

import { UnauthorizedException } from '../errors/unauthorized.exception';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(user: LoginUserDto): Promise<any> {
    const foundUser = await this.usersRepository.findOne(user.email);
    if (foundUser && foundUser.password === user.password) {
      const { password, ...result } = foundUser;
      return result;
    }
    return null;
  }

  async login(user: LoginUserDto) {
    const foundUser = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: user.email })
      .addSelect('user.password')
      .getOne();

    if (!foundUser) {
      throw new UnauthorizedException();
    }

    const passwordMatched = await bcrypt.compare(
      user.password,
      foundUser.password,
    );

    if (!passwordMatched) {
      throw new UnauthorizedException();
    }

    const payload = { email: foundUser.email, user_name: foundUser.user_name };

    delete foundUser.password;

    return {
      user: foundUser,
      token: this.jwtService.sign(payload),
    };
  }
}
