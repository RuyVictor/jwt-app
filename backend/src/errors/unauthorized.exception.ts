import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedException extends HttpException {
  constructor() {
    super('Incorrect email/password combination.', HttpStatus.UNAUTHORIZED);
  }
}
