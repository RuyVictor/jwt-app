import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { UserActions } from './user-actions.entity';
import { MailerService } from '@nestjs-modules/mailer';

import { WelcomeNewUserDto } from './dto/welcome-new-user.dto';
import { ConfirmEmailNotificationDto } from './dto/email-confirm-notification.dto';
import { ConfirmEmailDto } from './dto/email-confirm.dto';
import { ForgotPasswordNotificationDto } from './dto/forgot-password-notification.dto';
import { ForgotPasswordVerifyDto } from './dto/forgot-password-verify.dto';

import { NotFoundException } from 'src/errors/not-found.exception';
import { NotAcceptableException } from 'src/errors/not-acceptable.exception';

import * as bcrypt from 'bcryptjs';
import { Response } from 'express';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserActions)
    private userActionsRepository: Repository<UserActions>,
  ) {}

  welcomeNewUser(welcomeNewUserDto: WelcomeNewUserDto): void {
    this.mailerService
      .sendMail({
        to: welcomeNewUserDto.email,
        from: process.env.EMAIL_SENDER,
        subject: 'Bem vindo ao JWT-APP',
        html: `<p>Bem vindo, <b>${welcomeNewUserDto.user_name}</b></p>`,
      })
      .then(() => {})
      .catch(() => {});
  }

  async confirmEmailNotification(
    confirmEmailNotificationDto: ConfirmEmailNotificationDto,
  ): Promise<void> {
    const foundUser = await this.usersRepository.findOne({
      where: { email: confirmEmailNotificationDto.email },
      relations: ['user_actions'],
    });

    if (!foundUser) {
      throw new NotFoundException();
    }

    let code = String(Math.floor(Math.random() * 90000) + 10000);

    await this.userActionsRepository.update(foundUser.user_actions.id, {
      validation_token: code,
    });

    this.mailerService
      .sendMail({
        to: confirmEmailNotificationDto.email, // list of receivers
        from: process.env.EMAIL_SENDER, // sender address
        subject: 'JWT-APP Confirmação de email', // Subject line
        html: `<b>Seu código de ativação é ${code}</b>`, // HTML body content
      })
      .then(() => {})
      .catch(() => {});
  }

  async confirmEmail(
    confirmEmailDto: ConfirmEmailDto,
  ): Promise<void> {
    const foundUser = await this.usersRepository.findOne({
      where: { email: confirmEmailDto.email },
      relations: ['user_actions'],
    });

    if (!foundUser) {
      throw new NotFoundException();
    }

    const currentTime = new Date();
    const expiryTimeMinutes = 10;
    const expiryTime = foundUser.user_actions.updated_at;
    expiryTime.setTime(expiryTime.getTime() + (expiryTimeMinutes * 60 * 1000));
    
    if (expiryTime.getTime() < currentTime.getTime()) {
      throw new NotAcceptableException('Token expired!');
    }

    if (
      foundUser.user_actions.validation_token !==
      confirmEmailDto.code &&
      foundUser.user_actions.validation_token !==
      ""
    ) {
      throw new NotAcceptableException('Code is not equal!');
    }

    await this.usersRepository.update(foundUser.id, { verified: true });

    this.welcomeNewUser(foundUser);
  }

  async forgotPasswordNotification(
    forgotPasswordNotificationDto: ForgotPasswordNotificationDto
    ): Promise<void> {
    const foundUser = await this.usersRepository.findOne({
      where: { email: forgotPasswordNotificationDto.email },
      relations: ['user_actions'],
    });

    if (!foundUser) {
      throw new NotFoundException();
    }

    let code = String(Math.floor(Math.random() * 90000) + 10000);

    await this.userActionsRepository.update(foundUser.user_actions.id, {
      validation_token: code,
    });

    this.mailerService
      .sendMail({
        to: forgotPasswordNotificationDto.email, // list of receivers
        from: process.env.EMAIL_SENDER, // sender address
        subject: 'JWT-APP Recuperação de senha', // Subject line
        html: `<b>Seu código de ativação é ${code}</b>`, // HTML body content
      })
      .then(() => {})
      .catch(() => {});
  }

  async forgotPasswordVerify(
    forgotPasswordVerifyDto: ForgotPasswordVerifyDto,
  ): Promise<void> {
    const foundUser = await this.usersRepository.findOne({
      where: { email: forgotPasswordVerifyDto.email },
      relations: ['user_actions'],
    });

    if (!foundUser) {
      throw new NotFoundException();
    }

    const currentTime = new Date();
    const expiryTimeMinutes = 10;
    const expiryTime = foundUser.user_actions.updated_at;
    expiryTime.setTime(expiryTime.getTime() + (expiryTimeMinutes * 60 * 1000));
    
    if (expiryTime.getTime() < currentTime.getTime()) {
      throw new NotAcceptableException('Token expired!');
    }

    if (
      foundUser.user_actions.validation_token !==
      forgotPasswordVerifyDto.code &&
      foundUser.user_actions.validation_token !==
      ""
    ) {
      throw new NotAcceptableException('Code is not equal!');
    }

    if (forgotPasswordVerifyDto.password) {
      let newPassword = await bcrypt.hash(forgotPasswordVerifyDto.password, 8);
      await this.usersRepository.update(foundUser.id, {password: newPassword});
    }
  }
}
