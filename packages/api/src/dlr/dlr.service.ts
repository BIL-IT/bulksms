import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DlrService {
  constructor(private prisma: PrismaService) {}

  async handleDLR(
    report: string,
    message_id: string,
    recipient: string,
    message: string,
  ) {
    const storedMessage = await this.prisma.sms.findFirst({
      where: {
        id: message_id,
      },
    });

    if (storedMessage) {
      const updatedMessage = await this.prisma.sms.update({
        where: {
          id: message_id,
        },
        data: {
          status: report,
        },
      });

      if (!updatedMessage)
        throw new Error('Unable to update the status of the message');
    }

    if (!storedMessage) {
      const newMessage = await this.prisma.sms.create({
        data: {
          content: message,
          id: message_id,
          phone: recipient,
          sender: 'BIL',
          status: report,
        },
      });

      if (!newMessage) throw new Error('Unable to store a message');
    }

    return true;
  }
}
