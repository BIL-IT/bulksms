import { Query, Resolver } from '@nestjs/graphql';
import { KannelReportService } from './kannel-report.service';
import { KannelReport } from './output/kanne-report.output';

@Resolver()
export class KannelReportResolver {
  constructor(private kannelReportService: KannelReportService) {}

  @Query(() => KannelReport)
  async getReport() {
    const bearerBoxReport = await this.kannelReportService.getBearerBoxReport();
    const sMSBoxReport = await this.kannelReportService.getSMSBoxReport();

    return {
      bearerBoxReport,
      sMSBoxReport,
    } satisfies KannelReport;
  }
}
