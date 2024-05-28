import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { MessagesModule } from './messages/messages.module';
import { SmsClientService } from './sms-client/sms-client.service';
import { SmsClientModule } from './sms-client/sms-client.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,
      context: ({ res, req }) => ({ res, req }),
      cors: {
        credentials: true,
        origin: true,
      },
    }),
    AuthModule,
    PrismaModule,
    MessagesModule,
    SmsClientModule,
  ],
  controllers: [AppController],
  providers: [AppService, SmsClientService],
})
export class AppModule {}
