import { Module } from '@nestjs/common';
import { GenerateReportResolver } from './generate-report.resolver';
import { GenerateReportService } from './generate-report.service';

@Module({
  providers: [GenerateReportResolver, GenerateReportService]
})
export class GenerateReportModule {}
