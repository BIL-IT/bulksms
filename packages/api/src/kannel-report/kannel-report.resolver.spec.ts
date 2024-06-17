import { Test, TestingModule } from '@nestjs/testing';
import { KannelReportResolver } from './kannel-report.resolver';

describe('KannelReportResolver', () => {
  let resolver: KannelReportResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KannelReportResolver],
    }).compile();

    resolver = module.get<KannelReportResolver>(KannelReportResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
