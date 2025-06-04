import {
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class IsSameId implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const requestUserId =
      req.body?.variables[Object.keys(req.body?.variables)[0]]._id;
    try {
      if (req?.auth.userId === requestUserId) {
        return next.handle();
      } else {
        throw new UnauthorizedException();
      }
    } catch (err) {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    }
  }
}
