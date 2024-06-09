/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { SchedulerRegistry, Cron, CronExpression } from '@nestjs/schedule';
import { MessagesService } from 'src/messages/messages.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SmsClientService } from 'src/sms-client/sms-client.service';

type InsurancePolicyRenewalExpiry = {
  phone_no: string;
  message: string;
};

const testData = [
  {
    phone_no: '17439160/77360762',
    message:
      'Message Dear Tenzin (Test) , your Motor insurance policy no 91819494 bearing vehicle No BP-2-A5443 is due for renewal on 09/06/2024. Renew today to maintain continuous coverage and uninterrupted protection. Use mBIL apps to pay your premium or contact our renewal focal person at 17745138/17773589 to renew your policy via any other banking apps.',
  },
  {
    phone_no: '17949827/77853865',
    message:
      'Message Dear Govinda Parsad Sharma, your Motor insurance policy no 91819494 bearing vehicle No BP-2-A5443 is due for renewal on 09/06/2024. Renew today to maintain continuous coverage and uninterrupted protection. Use mBIL apps to pay your premium or contact our renewal focal person at 17745138/17773589 to renew your policy via any other banking apps.',
  },
  {
    phone_no: '17688382/17801773',
    message:
      'Message Dear Govinda Parsad Sharma, your Motor insurance policy no 91819494 bearing vehicle No BP-2-A5443 is due for renewal on 09/06/2024. Renew today to maintain continuous coverage and uninterrupted protection. Use mBIL apps to pay your premium or contact our renewal focal person at 17745138/17773589 to renew your policy via any other banking apps.',
  },
] as InsurancePolicyRenewalExpiry[];

const API =
  'http://172.16.16.191:8090/InsuranceSystem/api/insurance_policy_renewal_expirytoday_sms';

@Injectable()
export class CronJobsService implements OnModuleInit {
  constructor(
    private prisma: PrismaService,
    private readonly schedulerRegistry: SchedulerRegistry,
    private messagesService: MessagesService,
    private smsClientService: SmsClientService,
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

  // @Cron(CronExpression.EVERY_2ND_HOUR)
  @Cron('40 14 * * 0', {
    name: 'Renewal',
    timeZone: 'Asia/Thimphu',
  })
  async scheduledJobs() {
    // const res = await fetch(API);
    // const data = (await res.json()) as InsurancePolicyRenewalExpiry[];
    const data = testData;

    data.forEach((datum) => {
      datum.phone_no.split('/').forEach(async (phone_no) => {
        if (phone_no) {
          try {
            const messageSent = await this.smsClientService.sendMessage(
              phone_no,
              datum.message,
            );

            if (!messageSent) throw new Error('Unable to send message');
          } catch (error) {
            throw new Error(error);
          }
        }
      });
    });

    // console.log('HEllo from CRon');
  }

  onModuleInit() {
    this.restartAllJobs();
  }
}
