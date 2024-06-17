import { Test, TestingModule } from '@nestjs/testing';
import { KannelReportService } from './kannel-report.service';

describe('KannelReportService', () => {
  let service: KannelReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KannelReportService],
    }).compile();

    service = module.get<KannelReportService>(KannelReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
