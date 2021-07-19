import { IsEmail, IsString } from "class-validator";

export class WelcomeNewUserDto {
  @IsString()
  readonly user_name: string;

  @IsEmail()
  readonly email: string;
}
