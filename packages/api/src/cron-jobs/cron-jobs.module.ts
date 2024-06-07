import { Module } from '@nestjs/common';
import { CronJobsController } from './cron-jobs.controller';
import { CronJobsService } from './cron-jobs.service';
import { CronJobsResolver } from './cron-jobs.resolver';

@Module({
  controllers: [CronJobsController],
  providers: [CronJobsService, CronJobsResolver],
})
export class CronJobsModule {}
