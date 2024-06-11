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
import { SendSmsController } from './send-sms/send-sms.controller';
import { SendSmsService } from './send-sms/send-sms.service';
import { SendOtpService } from './send-otp/send-otp.service';
import { SendOtpModule } from './send-otp/send-otp.module';
import { GenerateReportModule } from './generate-report/generate-report.module';

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
    SendOtpModule,
    GenerateReportModule,
  ],
  controllers: [AppController, DlrController, CronJobsController, SendSmsController],
  providers: [AppService, SmsClientService, DlrService, CronJobsService, SendSmsService, SendOtpService],
})
export class AppModule {}
