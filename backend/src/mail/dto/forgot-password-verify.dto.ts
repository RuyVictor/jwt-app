import { IsEmail, IsString, IsOptional } from 'class-validator';

export class ForgotPasswordVerifyDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly code: string;

  @IsString()
  @IsOptional()
  readonly password?: string;
}
