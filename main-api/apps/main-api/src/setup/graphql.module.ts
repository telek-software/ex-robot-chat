import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      useFactory: (configService: ConfigService): ApolloDriverConfig => ({
        autoSchemaFile: process.cwd() + '/schema.gql',
        playground: configService.get<string>('NODE_ENV') === 'development',
        driver: ApolloDriver,
        sortSchema: true,
        installSubscriptionHandlers: true,
        subscriptions: {
          'graphql-ws': true,
        },
        context: (req: Request) => {
          return {
            Headers: req.headers,
          };
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class GraphqlModule {}
