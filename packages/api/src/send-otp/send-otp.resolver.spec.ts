import { Test, TestingModule } from '@nestjs/testing';
import { SendOtpResolver } from './send-otp.resolver';

describe('SendOtpResolver', () => {
  let resolver: SendOtpResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SendOtpResolver],
    }).compile();

    resolver = module.get<SendOtpResolver>(SendOtpResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
