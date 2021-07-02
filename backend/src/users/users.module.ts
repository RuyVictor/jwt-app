import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { UserActions } from 'src/mail/user-actions.entity';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserActions])],
  controllers: [UsersController],
  providers: [UsersService, MailService],
})
export class UsersModule {}
