import { Injectable } from '@nestjs/common';

@Injectable()
export class SmsClientService {
  async sendMessage(from: string, to: string, message: string) {
    const content = message + '\n\n -From Bhutan Insurance Limited';
    try {
      const res = await fetch(
        `http://172.16.16.105:13013/cgi-bin/sendsms?username=sms&password=sms123&to=${to}&from=${from}&text=${content}`,
      );

      const status = await res.text();
      return { content, status };
    } catch (error) {
      return { content: null, status: null };
    }
  }
}
