import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UserEntity } from '../entities/user.entity';
import { UsersService } from '../users.service';

export interface ExpressRequest extends Request {
  user?: UserEntity;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private userService: UsersService) {}

  async use(req: ExpressRequest, res: Response, next: NextFunction) {
    const token = req.cookies['accessToken'];

    if (!token) {
      req.user = null;
      next();
      return;
    }

    try {
      const decoded = verify(token, 'JWT_SECRET') as { email: string };
      const user = await this.userService.findByEmail(decoded.email);
      req.user = user;
      next();
    } catch (err) {
      req.user = null;
      next();
    }
  }
}
