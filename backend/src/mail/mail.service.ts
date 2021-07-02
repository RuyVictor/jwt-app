import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { UserActions } from './user-actions.entity';
import { MailerService } from '@nestjs-modules/mailer';

import { WelcomeNewUserDto } from './dto/welcome-new-user.dto';
import { EmailConfirmationDto } from './dto/email-confirmation.dto';
import { EmailReconfirmationDto } from './dto/email-reconfirmation.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ForgotPasswordCodeDto } from './dto/forgot-password-code.dto';
import { ForgotPasswordChangePasswordDto } from './dto/forgot-password-change-password.dto';

import { NotFoundException } from 'src/errors/not-found.exception';
import { NotAcceptableException } from 'src/errors/not-acceptable.exception';

import * as bcrypt from 'bcryptjs';

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

  async sendConfirmEmail(
    emailConfirmationDto: EmailConfirmationDto,
  ): Promise<void> {
    const foundUser = await this.usersRepository.findOne({
      where: { email: emailConfirmationDto.email },
      relations: ['user_actions'],
    });

    if (!foundUser) {
      throw new NotFoundException();
    }

    let code = String(Math.floor(Math.random() * 90000) + 10000);

    await this.userActionsRepository.update(foundUser.user_actions.id, {
      email_confirmation_token: code,
    });

    this.mailerService
      .sendMail({
        to: emailConfirmationDto.email, // list of receivers
        from: process.env.EMAIL_SENDER, // sender address
        subject: 'JWT-APP Confirmação de email', // Subject line
        html: `<b>Seu código de ativação é ${code}</b>`, // HTML body content
      })
      .then(() => {})
      .catch(() => {});
  }

  async reconfirmEmail(
    emailReconfirmationDto: EmailReconfirmationDto,
  ): Promise<void> {
    const foundUser = await this.usersRepository.findOne({
      where: { email: emailReconfirmationDto.email },
      relations: ['user_actions'],
    });

    if (!foundUser) {
      throw new NotFoundException();
    }

    if (
      foundUser.user_actions.email_confirmation_token !==
      emailReconfirmationDto.code
    ) {
      throw new NotAcceptableException('Code is not equal!');
    }

    await this.usersRepository.update(foundUser.id, { verified: true });

    this.welcomeNewUser(foundUser);
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<void> {
    const foundUser = await this.usersRepository.findOne({
      where: { email: forgotPasswordDto.email },
      relations: ['user_actions'],
    });

    if (!foundUser) {
      throw new NotFoundException();
    }

    let code = String(Math.floor(Math.random() * 90000) + 10000);

    await this.userActionsRepository.update(foundUser.user_actions.id, {
      forgot_password_token: code,
    });

    this.mailerService
      .sendMail({
        to: forgotPasswordDto.email, // list of receivers
        from: process.env.EMAIL_SENDER, // sender address
        subject: 'JWT-APP Recuperação de senha', // Subject line
        html: `<b>Seu código de ativação é ${code}</b>`, // HTML body content
      })
      .then(() => {})
      .catch(() => {});
  }

  async forgotPasswordCode(
    forgotPasswordCodeDto: ForgotPasswordCodeDto,
  ): Promise<void> {
    const foundUser = await this.usersRepository.findOne({
      where: { email: forgotPasswordCodeDto.email },
      relations: ['user_actions'],
    });

    if (!foundUser) {
      throw new NotFoundException();
    }

    if (
      foundUser.user_actions.forgot_password_token !==
      forgotPasswordCodeDto.code
    ) {
      throw new NotAcceptableException('Code is not equal!');
    }
  }

  async forgotPasswordChangePassword(
    forgotPasswordChangePasswordDto: ForgotPasswordChangePasswordDto,
  ): Promise<void> {
    const foundUser = await this.usersRepository.findOne({
      where: { email: forgotPasswordChangePasswordDto.email },
      relations: ['user_actions'],
    });

    if (!foundUser) {
      throw new NotFoundException();
    }

    if (
      foundUser.user_actions.forgot_password_token !==
      forgotPasswordChangePasswordDto.code
    ) {
      throw new NotAcceptableException('Code is not equal!');
    }

    let newPassword = await bcrypt.hash(forgotPasswordChangePasswordDto.password, 8);

    await this.usersRepository.update(foundUser.id, {password: newPassword});
  }
}
