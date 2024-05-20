import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AllMessages } from './output/all-messages.model';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async GetAllSMS(): Promise<AllMessages[]> {
    const messages = await this.prisma.sms.findMany({
      orderBy: {
        time: 'desc',
      },
    });

    if (!messages) throw new Error('Unable to retrieve messages');

    return messages;
  }

  async SendSMS(phoneNumbers: string[], content: string): Promise<string> {
    for (const phoneNumber of phoneNumbers) {
      const number = phoneNumber.trim();
      const regNumber = /^(^\+975|^975|^0)?([ -])?(1|7)(7)\d{6}$/;
      const id = crypto.randomUUID();
      if (!id) throw new Error('ID Uninitialized');
      const message = await this.prisma.sms.create({
        data: {
          id,
          content,
          phone: regNumber.test(number)
            ? number.substring(number.length - 8, number.length)
            : number,
        },
      });

      if (message) {
        await this.prisma.sms.update({
          where: {
            id: id!,
          },
          data: {
            status: 'Success',
          },
        });
      } else {
        await this.prisma.sms.update({
          where: {
            id,
          },
          data: {
            status: 'Failed',
          },
        });
      }

      if (!regNumber.test(number)) {
        await this.prisma.sms.update({
          where: {
            id,
          },
          data: {
            status: 'Invalid Format',
          },
        });
      }
    }
    return 'Success';
  }
}
