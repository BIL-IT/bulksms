import { Test, TestingModule } from '@nestjs/testing';
import { DlrService } from './dlr.service';

describe('DlrService', () => {
  let service: DlrService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DlrService],
    }).compile();

    service = module.get<DlrService>(DlrService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
