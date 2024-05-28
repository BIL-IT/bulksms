import { Global, Module } from '@nestjs/common';
import { SmsClientService } from './sms-client.service';

@Global()
@Module({
  providers: [SmsClientService],
  exports: [SmsClientService],
})
export class SmsClientModule {}
