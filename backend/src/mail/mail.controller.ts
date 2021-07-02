import { Body, Controller, Post } from '@nestjs/common';
import { EmailConfirmationDto } from './dto/email-confirmation.dto';
import { EmailReconfirmationDto } from './dto/email-reconfirmation.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ForgotPasswordCodeDto } from './dto/forgot-password-code.dto';
import { ForgotPasswordChangePasswordDto } from './dto/forgot-password-change-password.dto';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send-confirm-email')
  sendConfirmEmail(@Body() emailConfirmationDto: EmailConfirmationDto) {
    return this.mailService.sendConfirmEmail(emailConfirmationDto);
  }

  @Post('reconfirm-email')
  reconfirmEmail(@Body() emailReconfirmationDto: EmailReconfirmationDto) {
    return this.mailService.reconfirmEmail(emailReconfirmationDto);
  }

  @Post('forgot-password')
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.mailService.forgotPassword(forgotPasswordDto);
  }

  @Post('forgot-password-code')
  forgotPasswordConfirmation(
    @Body() forgotPasswordCodeDto: ForgotPasswordCodeDto,
  ) {
    return this.mailService.forgotPasswordCode(
      forgotPasswordCodeDto,
    );
  }

  @Post('forgot-password-change-password')
  forgotPasswordChangePassword(
    @Body() forgotPasswordChangePasswordDto: ForgotPasswordChangePasswordDto,
  ) {
    return this.mailService.forgotPasswordChangePassword(
      forgotPasswordChangePasswordDto,
    );
  }
}
