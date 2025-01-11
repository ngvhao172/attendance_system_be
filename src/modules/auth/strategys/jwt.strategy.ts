import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import express from 'express';
import { omit } from 'lodash';
import { Strategy } from 'passport-jwt';
import { UserService } from 'src/modules/user/user.service';
import { jwtConstants } from 'src/utils/constants';
import { ERole } from 'src/utils/enums/role.enum';
import { LoggedInterface } from 'src/interfaces/logged.interface';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  logger = new Logger(JwtStrategy.name);
  private user: LoggedInterface;

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: () => '',
      ignoreExpiration: true,
      secretOrKey: jwtConstants.secret,
    });
  }

  async authenticate(req: express.Request) {
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.replace('Bearer ', '');
      if (!token) {
        return this.fail('login-unauthorized', 401);
      }

      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: jwtConstants.secret,
        });

        const id = payload.id;

        const accountDB = await this.userService.findOne(id);
        this.user = {
          id: accountDB.id,
          email: accountDB?.email ?? '',
          role: accountDB?.role || ERole.Guest,
        };
        return this.success(omit(this.user), {});
      } catch {
        return this.fail('login-unauthorized', 401);
      }
    } else {
      return this.fail('login-unauthorized', 401);
    }
  }
}
