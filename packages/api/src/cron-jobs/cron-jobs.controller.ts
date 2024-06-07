import { Body, Controller, Post } from '@nestjs/common';
import { CronJobsService } from './cron-jobs.service';
import { CronJobDetailsInput } from './inputs/cron-job-details.input';
import { z } from 'zod';

const cronJobDetailsInputSchema = z.object({
  phone: z.string(),
  message: z.string(),
});

@Controller('cron-jobs')
export class CronJobsController {
  constructor(private cronJobService: CronJobsService) {}

  @Post()
  async createCronJob(@Body() cronJobDetailsInput: CronJobDetailsInput) {
    try {
      const input = cronJobDetailsInputSchema.parse(cronJobDetailsInput);
      const jobAdded = await this.cronJobService.addCronJob(
        input.phone,
        input.message,
      );
      if (!jobAdded) throw new Error('Unable to add a scheduler');
    } catch (error) {
      throw new Error(error);
    }
  }
}
