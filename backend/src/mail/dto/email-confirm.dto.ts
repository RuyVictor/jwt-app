import { IsEmail, IsString } from "class-validator";

export class ConfirmEmailDto {
  @IsEmail()
  readonly email: string;
  
  @IsString()
  readonly code: string;
}
