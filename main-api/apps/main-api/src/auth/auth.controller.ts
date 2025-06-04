import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { EndPoint } from '~utils/enums.utils';

import { AuthService } from './auth.service';
import { BasicAuthInput } from './dto';
import { AuthGuard } from './guards';
import { JWTPayload } from './type';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post(EndPoint.login)
  signIn(@Body() signInDto: BasicAuthInput) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get(EndPoint.profile)
  getProfile(@Request() req: { user: JWTPayload }) {
    return req.user;
  }
}
