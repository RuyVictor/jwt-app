import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { UserActions } from './user-actions.entity';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserActions])],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
