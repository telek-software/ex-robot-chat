import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import logger from '~[shared]/functions/logger';
import { UsersService } from '~users/users.service';
import { compare } from '~utils/crypt.utils';

import { BasicAuthOutput } from './dto';
import { JWTPayload } from './type';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async checkAuth(id: number): Promise<Omit<BasicAuthOutput, 'accessToken'>> {
    const user = await this.usersService.findOne({ id });
    if (!user) throw new NotFoundException();

    if (user?.isDeleted) {
      logger.warn('[main.auth] This user was soft-deleted');
      throw new NotFoundException();
    }
    return { username: user.username, email: user.email };
  }

  async signIn(email: string, pass: string): Promise<BasicAuthOutput> {
    const user = await this.usersService.findOne({ email });
    if (!user) throw new NotFoundException();

    if (user.isDeleted) {
      logger.warn('[main.auth] This user was soft-deleted');
      throw new NotFoundException();
    }
    if (!compare({ encrypted: user.password, decrypted: pass })) {
      throw new NotFoundException();
    }
    const payload: JWTPayload = {
      id: user.id,
      email: user.email,
    };
    return {
      accessToken: await this.jwtService.signAsync(payload),
      username: user.username,
      email: user.email,
    };
  }
}
