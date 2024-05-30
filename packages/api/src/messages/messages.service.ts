import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AllMessages } from './output/all-messages.model';
import { SmsClientService } from 'src/sms-client/sms-client.service';

// http://172.16.16.105:13013/cgi-bin/sendsms?username=sms&password=sms123&to=77360762&from=BIL&text=testing

@Injectable()
export class MessagesService {
  constructor(
    private prisma: PrismaService,
    private smsClient: SmsClientService,
  ) {}

  async GetAllSMS(): Promise<AllMessages[]> {
    const messages = await this.prisma.sms.findMany({
      orderBy: {
        time: 'desc',
      },
    });

    if (!messages) throw new Error('Unable to retrieve messages');

    return messages;
  }

  async SendSMS(
    phoneNumbers: string[],
    message: string,
    sender: string,
  ): Promise<string> {
    for (const phoneNumber of phoneNumbers) {
      const number = phoneNumber.trim();
      const regNumber = /^(^\+975|^975|^0)?([ -])?(1|7)(7)\d{6}$/;
      const acceptedNumber = regNumber.test(number)
        ? number.substring(number.length - 8, number.length)
        : number;

      const id = crypto.randomUUID();
      if (!id) throw new Error('ID Uninitialized');

      if (!regNumber.test(number)) {
        await this.prisma.sms.update({
          where: {
            id,
          },
          data: {
            status: 'Invalid Format',
          },
        });

        continue;
      }

      const { content, status } = await this.smsClient.sendMessage(
        'BIL',
        acceptedNumber,
        message,
      );

      if (!status) {
        await this.prisma.sms.create({
          data: {
            id,
            content: content,
            phone: acceptedNumber,
            sender,
            status: 'Failed',
          },
        });
      }
    }
    return 'Success';
  }
}
