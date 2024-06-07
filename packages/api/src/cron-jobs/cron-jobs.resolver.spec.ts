import { Test, TestingModule } from '@nestjs/testing';
import { CronJobsResolver } from './cron-jobs.resolver';

describe('CronJobsResolver', () => {
  let resolver: CronJobsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CronJobsResolver],
    }).compile();

    resolver = module.get<CronJobsResolver>(CronJobsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
