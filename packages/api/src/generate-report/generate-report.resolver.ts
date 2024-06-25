import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GenerateReportService } from './generate-report.service';
import { ReportDetailsInput } from './inputs/report-details.input';
import { z } from 'zod';

const reportSchema = z.object({
  startDate: z.date().min(new Date(0), {
    message: 'Date is required',
  }),
  endDate: z.date().min(new Date(0), {
    message: 'Date is required',
  }),
  type: z.string(),
  status: z.string().array(),
});

@Resolver()
export class GenerateReportResolver {
  constructor(private generateReportService: GenerateReportService) {}

  @Mutation(() => String)
  async generateReport(
    @Args('reportDetailsInput') reportDetailsInput: ReportDetailsInput,
  ): Promise<string> {
    const parsedSchema = reportSchema.parse(reportDetailsInput);
    const data = this.generateReportService.generateReport(
      parsedSchema.startDate,
      parsedSchema.endDate,
      parsedSchema.type,
      parsedSchema.status,
    );
    return data;
  }
}
