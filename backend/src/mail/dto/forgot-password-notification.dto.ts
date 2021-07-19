import { IsEmail } from "class-validator";

export class ForgotPasswordNotificationDto {
  @IsEmail()
  readonly email: string;
}
