import { ExecutionContext, Injectable, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Injectable()
class GqlThrottlerGuard extends ThrottlerGuard {
  getRequestResponse(context: ExecutionContext) {
    const gqlCtx = GqlExecutionContext.create(context);
    const ctx = gqlCtx.getContext();
    return { req: ctx.req, res: ctx.res };
  }
}
@Module({
  imports: [
    ThrottlerModule.forRoot({
      /* Brute Force Protection */
      ttl: 60,
      limit: 40,
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      //For the use with graphQL
      provide: APP_GUARD,
      useClass: GqlThrottlerGuard,
    },
  ],
})
export class ThrotthlerModule {}
