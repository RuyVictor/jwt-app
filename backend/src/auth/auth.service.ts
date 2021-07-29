import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { RevokedToken } from '../users/revoked-token.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { LoginUserDto } from './dto/login-user.dto';

import { UnauthorizedException } from '../errors/unauthorized.exception';

interface JwtPayload {
  id: string,
  email: string,
  user_name: string,
  exp: string,
  iat: string
}

type DecodedPayload = {
  [key in "id" | "email" | "user_name" | "exp" | "iat"]: string;
};

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(RevokedToken)
    private revokedTokenRepository: Repository<RevokedToken>,
    private jwtService: JwtService,
  ) {}

  async login(user: LoginUserDto): Promise<{ user: User; token: string }> {
    const foundUser = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: user.email })
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

    delete foundUser.password;

    return {
      user: foundUser,
      token: generatedToken,
    };
  }

  async logout(token: string): Promise<{message: string}> {
    const [, formattedToken] = token.split(' ')
    await this.revokedTokenRepository.save({token: formattedToken});
    return { message: "Logout succefully." }
  }

  async refreshToken(token: string) {
    const [, formattedToken] = token.split(' ')
    const decodedToken = this.jwtService.decode(formattedToken) as DecodedPayload;
    
    if (!decodedToken) {
      throw new UnauthorizedException('Invalid token.');
    }

    const foundUser = await this.usersRepository.findOne(decodedToken['id'], {relations: ['user_actions']})

    if (!foundUser) {
      throw new UnauthorizedException('Invalid token.');
    }

    await this.revokedTokenRepository.save({token: formattedToken}); //delete current token
    
    const payload = {
      id: foundUser.id,
      email: foundUser.email,
      user_name: foundUser.user_name,
    };

    const generatedToken = this.jwtService.sign(payload); // generate new token

    return { newToken: generatedToken };
  }

  async validateToken(token: string, payload: JwtPayload): Promise<boolean> {
    const [, formattedToken] = token.split(' ')
    //compare with deleted tokens
    const foundRevokedToken = await this.revokedTokenRepository.findOne(
      {where: {token: formattedToken}
    });

    if (foundRevokedToken) {
      return false;
    }

    return true;
  }
}
