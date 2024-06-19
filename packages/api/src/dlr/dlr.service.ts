import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

const dlrCodes = {
  '1': 'Delivered',
  '2': 'Non-Delivered to Phone',
  '4': 'Queued on SMSC',
  '8': 'Delivered',
  '16': 'Non-Delivered to SMSC',
  '17': 'Invalid Format',
  '18': 'Failed',
};

@Injectable()
export class DlrService {
  constructor(private prisma: PrismaService) {}

  async handleDLR(
    report: string,
    message_id: string,
    recipient: string,
    message: string,
    branchCode: string | null | undefined,
    partyCode: string | null | undefined,
  ) {
    const storedMessage = await this.prisma.sms.findFirst({
      where: {
        id: message_id,
      },
    });

    console.log(storedMessage);

    if (storedMessage) {
      const updatedMessage = await this.prisma.sms.update({
        where: {
          id: message_id,
        },
        data: {
          status: dlrCodes[report as keyof typeof dlrCodes],
        },
      });

      if (!updatedMessage)
        throw new Error('Unable to update the status of the message');
    }

    if (!storedMessage) {
      const newMessage = await this.prisma.sms.create({
        data: {
          content: message + '\n\n -From Bhutan Insurance Limited',
          id: message_id,
          phone: recipient,
          sender: 'BIL',
          status: dlrCodes[report as keyof typeof dlrCodes],
          partyCode: partyCode || '',
          branchCode: branchCode || '',
        },
      });

      if (!newMessage) throw new Error('Unable to store a message');
    }

    return true;
  }
}
