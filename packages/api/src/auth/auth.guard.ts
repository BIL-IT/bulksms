import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();

    const response: Response = ctx.res;

    const token: string = ctx.req.cookies.auth || '';

    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        ignoreExpiration: true,
      });

      if (payload.exp * 1000 < Date.now()) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { iat, exp, ...otherPayload } = payload;

        const newToken = await this.jwtService.signAsync(otherPayload);
        response.cookie('auth', newToken, {
          httpOnly: false,
          maxAge: 3.6e6,
          secure: true,
        });
      }

      ctx['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
