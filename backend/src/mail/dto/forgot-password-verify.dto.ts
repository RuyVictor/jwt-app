export class ForgotPasswordVerifyDto {
  readonly email: string;
  readonly code: string;
  readonly password?: string;
}
