import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { UserActions } from '../users/user-actions.entity';
import { AuthToken } from '../users/auth-token.entity';
import { ValidationToken } from '../users/validation-token.entity';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { MailService } from 'src/mail/mail.service';

import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserActions, AuthToken, ValidationToken]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, MailService, JwtStrategy],
})
export class AuthModule {}
