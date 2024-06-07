/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { SchedulerRegistry, Cron, CronExpression } from '@nestjs/schedule';
import { MessagesService } from 'src/messages/messages.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CronJobsService implements OnModuleInit {
  constructor(
    private prisma: PrismaService,
    private readonly schedulerRegistry: SchedulerRegistry,
    private messagesService: MessagesService,
  ) {}

  private readonly logger = new Logger(CronJobsService.name);

  async restartAllJobs() {}

  async deleteAllJobs() {}

  async addCronJob(phone: string, message: string) {
    const addedJob = await this.prisma.cron.create({
      data: {
        message,
        to: phone,
      },
    });

    if (!addedJob) throw new Error('Unable to create a Scheduler');

    return 'Success';
    // TODO: Database Operation goes here
    // const seconds = 10;
    // const job = new CronJob(`${seconds} * * * * *`, () => {
    //   this.logger.warn(`time (${seconds}) for job ${name} to run!`);
    // });
    // const cron = this.schedulerRegistry.addCronJob(name, job);
  }

  // @Cron(CronExpression.EVERY_10_SECONDS)
  async scheduledJobs() {
    const getScheduledJobs = await this.prisma.cron.findMany();
    for (const job of getScheduledJobs) {
      await this.messagesService.SendSMS(job.to.split(','), job.message, 'BIL');
    }
  }

  onModuleInit() {
    this.restartAllJobs();
  }
}
