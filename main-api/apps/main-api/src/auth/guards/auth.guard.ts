import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

import { IS_PUBLIC_KEY } from '~utils/decorators.utils';

import { JWTPayload } from '../type';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private configService: ConfigService,
  ) {}

  private extractBearer(authStr: string) {
    const [type, token] = authStr?.split(' ') || [];
    if (type === 'Bearer') return token;
    return null;
  }

  private getGQLWSToken(ctx: any) {
    const connectionParams = ctx?.req?.connectionParams || undefined;
    if (!connectionParams) return connectionParams;
    return this.extractBearer(connectionParams.Authorization as string);
  }

  private getGQLToken(ctx: any) {
    const auth = ctx.Headers?.authorization;
    if (!auth) {
      return this.getGQLWSToken(ctx);
    }
    return this.extractBearer(auth);
  }

  private getHTTPToken(context: ExecutionContext) {
    const auth = context.switchToHttp().getRequest()?.headers?.authorization;
    if (!auth) return null;
    return this.extractBearer(auth);
  }

  /**
   * canActivate
   * @description
   *  Check if a controller (an endpoint) can be accessed
   *  - If it is marked as public ( check the "@Public" decorator)
   *  the controller can be accessed.
   *  - If it is not marked as '@'Public the JWT token will be checked
   *    - In the GraphQL request
   *    - Or in the http request
   *    - It Will throw an Error if the token is not valid
   *
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const ctx = GqlExecutionContext.create(context).getContext();
    let token = this.getGQLToken(ctx);
    if (!token) token = this.getHTTPToken(context);
    if (!token) return false;

    try {
      const payload = await this.jwtService.verifyAsync<JWTPayload>(token, {
        secret: this.configService.get<string>('SECRET_SESSION'),
      });
      // We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      if (!payload) return false;
      ctx['auth'] = payload;
    } catch {
      return false;
    }
    return true;
  }
}
