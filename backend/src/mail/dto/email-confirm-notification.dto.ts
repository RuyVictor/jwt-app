import { IsEmail } from 'class-validator';

export class ConfirmEmailNotificationDto {
  @IsEmail()
  readonly email: string;
}
