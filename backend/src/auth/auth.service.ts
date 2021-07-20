import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { AuthToken } from '../users/auth-token.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { LoginUserDto } from './dto/login-user.dto';

import { UnauthorizedException } from '../errors/unauthorized.exception';

type IPayload = {
  [key in "id" | "email" | "user_name"]: string;
};

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(AuthToken)
    private authTokenRepository: Repository<AuthToken>,
    private jwtService: JwtService,
  ) {}

  async login(user: LoginUserDto): Promise<{ user: User; token: string }> {
    const foundUser = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: user.email })
      .leftJoinAndSelect('user.user_actions', 'user_actions')
      .leftJoinAndSelect('user_actions.auth_token', 'auth_token')
      .addSelect('user.password')
      .getOne();

    if (!foundUser) {
      throw new UnauthorizedException('Incorrect credentials.');
    }

    const passwordMatched = await bcrypt.compare(
      user.password,
      foundUser.password,
    );

    if (!passwordMatched) {
      throw new UnauthorizedException('Incorrect credentials.');
    }

    const payload = {
      id: foundUser.id,
      email: foundUser.email,
      user_name: foundUser.user_name,
    };

    const generatedToken = this.jwtService.sign(payload);

    await this.authTokenRepository.update(foundUser.user_actions.auth_token.id, {
      token: generatedToken
    });

    delete foundUser.password;
    delete foundUser.user_actions;

    return {
      user: foundUser,
      token: generatedToken,
    };
  }

  async refreshToken(token: string) {
    const [, formattedToken] = token.split(' ')
    const decodedToken = this.jwtService.decode(formattedToken) as IPayload;

    const foundUser = await this.usersRepository.findOne(decodedToken['id'], {relations: ['user_actions']})

    if (!foundUser) {
      throw new UnauthorizedException('Invalid token.');
    }

    const tokenFromDatabase = foundUser.user_actions.auth_token.token;

    if (formattedToken !== tokenFromDatabase) {
      throw new UnauthorizedException('Token has been expired or invalid.');
    }
    
    const payload = {
      id: foundUser.id,
      email: foundUser.email,
      user_name: foundUser.user_name,
    };

    const generatedToken = this.jwtService.sign(payload);

    await this.authTokenRepository.update(foundUser.user_actions.auth_token.id, {
      token: generatedToken
    });

    return { newToken: generatedToken };
  }
}
