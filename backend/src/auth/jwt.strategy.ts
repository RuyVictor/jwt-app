import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

import { AuthService } from './auth.service';

import { UnauthorizedException } from 'src/errors/unauthorized.exception';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true
    });
  }

  async validate(request: Request, payload: any) {
    const result = await this.authService.validateToken(request.headers.authorization, payload);
    if (!result) {
      throw new UnauthorizedException('Invalid token.');
    }
    return result;
  }
}
