import { Module } from '@nestjs/common';
import { SendOtpResolver } from './send-otp.resolver';
import { SendOtpService } from './send-otp.service';

@Module({
  providers: [SendOtpResolver, SendOtpService],
})
export class SendOtpModule {}
