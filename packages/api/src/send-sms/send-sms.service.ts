import { Injectable } from '@nestjs/common';
import { SmsClientService } from 'src/sms-client/sms-client.service';

@Injectable()
export class SendSmsService {
  constructor(private smsClientService: SmsClientService) {}

  async sendSMS(message: string, to: string) {
    try {
      const messageSent = await this.smsClientService.sendMessage(to, message);

      if (!messageSent) throw new Error('Unable to send message');
    } catch (error) {
      throw new Error(error);
    }
  }
}
