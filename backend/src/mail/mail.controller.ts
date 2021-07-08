import { Body, Controller, Post } from '@nestjs/common';
import { ConfirmEmailNotificationDto } from './dto/email-confirm-notification.dto';
import { ConfirmEmailDto } from './dto/email-confirm.dto';
import { ForgotPasswordNotificationDto } from './dto/forgot-password-notification.dto';
import { ForgotPasswordVerifyDto } from './dto/forgot-password-verify.dto';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('confirm-email-notification')
  confirmEmailNotification(@Body() confirmEmailNotificationDto: ConfirmEmailNotificationDto) {
    return this.mailService.confirmEmailNotification(confirmEmailNotificationDto);
  }

  @Post('confirm-email')
  confirmEmail(@Body() confirmEmailDto: ConfirmEmailDto) {
    return this.mailService.confirmEmail(confirmEmailDto);
  }

  @Post('forgot-password-notification')
  forgotPasswordNotification(@Body() forgotPasswordNotificationDto: ForgotPasswordNotificationDto) {
    return this.mailService.forgotPasswordNotification(forgotPasswordNotificationDto);
  }

  @Post('forgot-password-verify')
  forgotPasswordVerify(@Body() forgotPasswordVerifyDto: ForgotPasswordVerifyDto) {
    return this.mailService.forgotPasswordVerify(forgotPasswordVerifyDto);
  }
}
