import { Injectable } from '@nestjs/common';

@Injectable()
export class SmsClientService {
  async sendMessage(to: string, message: string, from?: string) {
    const encodedMessage = encodeURI(message);
    const content = message + '\n\n -From Bhutan Insurance Limited';
    const uuid = crypto.randomUUID();
    // const encodedURL = encodeURIComponent(
    //   `http://localhost:3001/dlr?message_id=${uuid}&report=%d&recipient=${to}&message=${encodedMessage}`,
    // );
    const encodedURL = encodeURIComponent(
      `https://172.16.40.24:2001/dlr?message_id=${uuid}&report=%d&recipient=${to}&message=${encodedMessage}`,
    );
    try {
      const res = await fetch(
        `http://localhost:13013/cgi-bin/sendsms?username=sms&password=sms123&to=${to}&from=${from ?? 'BIL'}&text=${content}&dlr-mask=19&dlr-url=${encodedURL}`,
      );

      const status = await res.text();
      return { content, status };
    } catch (error) {
      return { content: null, status: null };
    }
  }
}
