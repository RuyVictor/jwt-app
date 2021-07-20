import { IsString } from 'class-validator';

export class ChangeUserPasswordDto {
  @IsString()
  readonly password: string;

  @IsString()
  readonly newPassword: string;
}
