import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AsyncParser } from '@json2csv/node';

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

@Injectable()
export class GenerateReportService {
  constructor(private prisma: PrismaService) {}

  async generateReport(
    startDate: Date,
    endDate: Date,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    status: string[],
  ): Promise<string> {
    await delay(1500);
    try {
      const fields = ['id', 'time', 'sender', 'phone', 'content', 'status'];
      const sms = await this.prisma.sms.findMany({
        where: {
          time: {
            gte: startDate,
            lte: endDate,
          },
          // status: {
          //   in: status,
          // },
        },
      });
      const parser = new AsyncParser({ fields });

      // const fieldNames = ['Name', 'Phone', 'Mobile', 'Email', 'Address', 'Notes'];
      const data = await parser.parse(sms).promise();
      // const base64 = this.base64_encode(data);

      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}
