/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { SchedulerRegistry, Cron, CronExpression } from '@nestjs/schedule';
import { MessagesService } from 'src/messages/messages.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SmsClientService } from 'src/sms-client/sms-client.service';
import * as argon from 'argon2';

type InsurancePolicyRenewalExpiry = {
  phone_no: string;
  message: string;
  branch_code: string;
  business_code: string;
};

const RENEWAL_14_DAYS_BEFORE_API =
  'https://172.16.16.155/api/insurance_policy_renewal_14daysbefore_sms';

const RENEWAL_EXPIRY_API =
  'https://172.16.16.155/api/insurance_policy_renewal_expirytoday_sms';

const RENEWAL_5_DAYS_BEFORE_API =
  'https://172.16.16.155/api/insurance_policy_renewal_5daysbefore_sms';

const RENEWAL_ACKNOWLEDGEMENT_API =
  'https://172.16.16.155/api/insurance_policy_renewal_acknowledge_sms';

const LOAN_ACKNOWLEDGEMENT_API =
  'https://172.16.16.148/sms/loan_acknowledgement_sms.php';

const LOAN_REMINDER_API =
  'https://172.16.16.148/sms/loan_repayment_reminder_sms.php';

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

  // @Cron(CronExpression.EVERY_10_SECONDS, {
  //   name: 'Test',
  // })
  @Cron('0 8 * * *', {
    name: 'Renewal 14 Days Before',
    timeZone: 'Asia/Thimphu',
  })
  async scheduledRenewal14() {
    const res = await fetch(RENEWAL_14_DAYS_BEFORE_API, {
      mode: 'no-cors',
    });
    const data = (await res.json()) as InsurancePolicyRenewalExpiry[];
    // const data = testData;

    data.forEach((datum) => {
      datum.phone_no.split('/').forEach(async (phone_no) => {
        if (phone_no) {
          // const messageSent = await this.smsClientService.sendMessage(
          //   phone_no,
          //   datum.message,
          // );
          // if (!messageSent) throw new Error('Unable to send message');

          await this.smsClientService.sendMessage(
            phone_no,
            datum.message,
            'BIL',
            datum.branch_code,
            datum.business_code,
            'Renewal',
          );
        }
      });
    });
  }

  // @Cron(CronExpression.EVERY_5_SECONDS, {
  //   name: 'Test2',
  // })
  @Cron('2 8 * * *', {
    name: 'Renewal 5 Days Before',
    timeZone: 'Asia/Thimphu',
  })
  async scheduledRenewal5() {
    const res = await fetch(RENEWAL_5_DAYS_BEFORE_API, {
      mode: 'no-cors',
    });
    const data = (await res.json()) as InsurancePolicyRenewalExpiry[];
    // const data = testData;

    data.forEach((datum) => {
      datum.phone_no.split('/').forEach(async (phone_no) => {
        if (phone_no) {
          // const messageSent = await this.smsClientService.sendMessage(
          //   phone_no,
          //   datum.message,
          // );
          // if (!messageSent) throw new Error('Unable to send message');

          await this.smsClientService.sendMessage(
            phone_no,
            datum.message,
            'BIL',
            datum.branch_code,
            datum.business_code,
            'Renewal',
          );
        }
      });
    });
  }

  @Cron('4 8 * * *', {
    name: 'Expiry',
    timeZone: 'Asia/Thimphu',
  })
  async scheduledExpiry() {
    const res = await fetch(RENEWAL_EXPIRY_API, {
      mode: 'no-cors',
    });
    const data = (await res.json()) as InsurancePolicyRenewalExpiry[];
    // const data = testData;

    data.forEach((datum) => {
      datum.phone_no.split('/').forEach(async (phone_no) => {
        if (phone_no) {
          // const messageSent = await this.smsClientService.sendMessage(
          //   phone_no,
          //   datum.message,
          // );
          // if (!messageSent) throw new Error('Unable to send message');

          await this.smsClientService.sendMessage(
            phone_no,
            datum.message,
            'BIL',
            datum.branch_code,
            datum.business_code,
            'Renewal',
          );
        }
      });
    });
  }

  @Cron('6 8 * * *', {
    name: 'Acknowledgement',
    timeZone: 'Asia/Thimphu',
  })
  async scheduledAcknowledgement() {
    const res = await fetch(RENEWAL_ACKNOWLEDGEMENT_API, {
      mode: 'no-cors',
    });
    const data = (await res.json()) as InsurancePolicyRenewalExpiry[];
    // const data = testData;

    data.forEach((datum) => {
      datum.phone_no.split('/').forEach(async (phone_no) => {
        if (phone_no) {
          // const messageSent = await this.smsClientService.sendMessage(
          //   phone_no,
          //   datum.message,
          // );
          // if (!messageSent) throw new Error('Unable to send message');

          await this.smsClientService.sendMessage(
            phone_no,
            datum.message,
            'BIL',
            datum.branch_code,
            datum.business_code,
            'Renewal',
          );
        }
      });
    });
  }

  @Cron('8 8 * * *', {
    name: 'LoanAcknowledgement',
    timeZone: 'Asia/Thimphu',
  })
  async scheduledLoanAcknowledgement() {
    const res = await fetch(LOAN_ACKNOWLEDGEMENT_API, {
      mode: 'no-cors',
    });
    const data = (await res.json()) as InsurancePolicyRenewalExpiry[];
    // const data = testData;

    data.forEach((datum) => {
      datum.phone_no.split('/').forEach(async (phone_no) => {
        if (phone_no) {
          // const messageSent = await this.smsClientService.sendMessage(
          //   phone_no,
          //   datum.message,
          // );
          // if (!messageSent) throw new Error('Unable to send message');

          await this.smsClientService.sendMessage(
            phone_no,
            datum.message,
            'BIL',
            '',
            '',
            'Loan',
          );
        }
      });
    });
  }

  @Cron('10 8 * * *', {
    name: 'LoanReminder',
    timeZone: 'Asia/Thimphu',
  })
  async scheduledLoanReminder() {
    const res = await fetch(LOAN_REMINDER_API, {
      mode: 'no-cors',
    });
    const data = (await res.json()) as InsurancePolicyRenewalExpiry[];
    // const data = testData;

    data.forEach((datum) => {
      datum.phone_no.split('/').forEach(async (phone_no) => {
        if (phone_no) {
          // const messageSent = await this.smsClientService.sendMessage(
          //   phone_no,
          //   datum.message,
          // );
          // if (!messageSent) throw new Error('Unable to send message');

          await this.smsClientService.sendMessage(
            phone_no,
            datum.message,
            'BIL',
            '',
            '',
            'Loan',
          );
        }
      });
    });
  }

  async onModuleInit() {
    await this.restartAllJobs();
  }
}
