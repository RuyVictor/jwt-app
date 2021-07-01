import { HttpException, HttpStatus } from '@nestjs/common';

export class ConflictException extends HttpException {
  constructor(public message: string) {
    super(message, HttpStatus.CONFLICT);
  }
}
