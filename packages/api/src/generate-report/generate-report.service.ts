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
    status: string[],
  ): Promise<string> {
    try {
      const fields = [
        'id',
        'time',
        'sender',
        'branchCode',
        'partyCode',
        'phone',
        'content',
        'status',
      ];
      const sms = await this.prisma.sms.findMany({
        orderBy: {
          time: 'desc',
        },
        where: {
          time: {
            gte: startDate,
            lte: endDate,
          },
          status: {
            in: status,
          },
        },
      });
      const parser = new AsyncParser({ fields });

      // const fieldNames = ['Name', 'Phone', 'Mobile', 'Email', 'Address', 'Notes'];
      const data = await parser.parse(sms).promise();
      await delay(1000);

      // const base64 = this.base64_encode(data);

      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}
