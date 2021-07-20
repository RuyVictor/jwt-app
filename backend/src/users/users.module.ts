import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { UserActions } from '../users/user-actions.entity';
import { AuthToken } from '../users/auth-token.entity';
import { ValidationToken } from '../users/validation-token.entity';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserActions, AuthToken, ValidationToken])],
  controllers: [UsersController],
  providers: [UsersService, MailService],
})
export class UsersModule {}
