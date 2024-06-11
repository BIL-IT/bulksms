import { Test, TestingModule } from '@nestjs/testing';
import { GenerateReportResolver } from './generate-report.resolver';

describe('GenerateReportResolver', () => {
  let resolver: GenerateReportResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenerateReportResolver],
    }).compile();

    resolver = module.get<GenerateReportResolver>(GenerateReportResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
