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
import { DlrController } from './dlr/dlr.controller';
import { DlrService } from './dlr/dlr.service';
import { CronJobsService } from './cron-jobs/cron-jobs.service';
import { CronJobsModule } from './cron-jobs/cron-jobs.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronJobsController } from './cron-jobs/cron-jobs.controller';

@Module({
  imports: [
    ScheduleModule.forRoot(),
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
    CronJobsModule,
  ],
  controllers: [AppController, DlrController, CronJobsController],
  providers: [AppService, SmsClientService, DlrService, CronJobsService],
})
export class AppModule {}
