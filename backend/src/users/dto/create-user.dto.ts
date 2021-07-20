import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly user_name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;
}
