import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { ValidationToken } from '../users/validation-token.entity';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, ValidationToken])],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
