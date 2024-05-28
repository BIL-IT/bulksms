import { Test, TestingModule } from '@nestjs/testing';
import { SmsClientService } from './sms-client.service';

describe('SmsClientService', () => {
  let service: SmsClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SmsClientService],
    }).compile();

    service = module.get<SmsClientService>(SmsClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
