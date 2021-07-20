import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { ValidationToken } from '../users/validation-token.entity';
import { MailerService } from '@nestjs-modules/mailer';

import { WelcomeNewUserDto } from './dto/welcome-new-user.dto';
import { ConfirmEmailNotificationDto } from './dto/email-confirm-notification.dto';
import { ConfirmEmailDto } from './dto/email-confirm.dto';
import { ForgotPasswordNotificationDto } from './dto/forgot-password-notification.dto';
import { ForgotPasswordVerifyDto } from './dto/forgot-password-verify.dto';

import { NotFoundException } from 'src/errors/not-found.exception';
import { UnauthorizedException } from 'src/errors/unauthorized.exception';

import * as bcrypt from 'bcryptjs';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(ValidationToken)
    private validationTokenRepository: Repository<ValidationToken>,
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

    await this.validationTokenRepository.update(foundUser.user_actions.validation_token.id, {
      token: code
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

  async confirmEmail(confirmEmailDto: ConfirmEmailDto): Promise<void> {
    const foundUser = await this.usersRepository.findOne({
      where: { email: confirmEmailDto.email },
      relations: ['user_actions'],
    });

    if (!foundUser) {
      throw new NotFoundException();
    }

    const currentTime = new Date();
    const expiryTimeMinutes = 10;
    const expiryTime = foundUser.user_actions.validation_token.updated_at;
    expiryTime.setTime(expiryTime.getTime() + expiryTimeMinutes * 60 * 1000);

    if (expiryTime.getTime() < currentTime.getTime()) {
      throw new UnauthorizedException('Token expired!');
    }

    if (
      foundUser.user_actions.validation_token.token !== confirmEmailDto.code &&
      foundUser.user_actions.validation_token.token !== ''
    ) {
      throw new UnauthorizedException('Code is not equal!');
    }

    await this.usersRepository.update(foundUser.id, { verified: true });

    this.welcomeNewUser(foundUser);
  }

  async forgotPasswordNotification(
    forgotPasswordNotificationDto: ForgotPasswordNotificationDto,
  ): Promise<void> {
    const foundUser = await this.usersRepository.findOne({
      where: { email: forgotPasswordNotificationDto.email },
      relations: ['user_actions'],
    });

    if (!foundUser) {
      throw new NotFoundException();
    }

    let code = String(Math.floor(Math.random() * 90000) + 10000);

    await this.validationTokenRepository.update(foundUser.user_actions.validation_token.id, {
      token: code,
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
    const expiryTime = foundUser.user_actions.validation_token.updated_at;
    expiryTime.setTime(expiryTime.getTime() + expiryTimeMinutes * 60 * 1000);

    if (expiryTime.getTime() < currentTime.getTime()) {
      throw new UnauthorizedException('Token expired!');
    }

    if (
      foundUser.user_actions.validation_token.token !==
        forgotPasswordVerifyDto.code &&
      foundUser.user_actions.validation_token.token !== ''
    ) {
      throw new UnauthorizedException('Code is not equal!');
    }

    if (forgotPasswordVerifyDto.password) {
      let newPassword = await bcrypt.hash(forgotPasswordVerifyDto.password, 8);
      await this.usersRepository.update(foundUser.id, {
        password: newPassword,
      });
    }
  }
}
