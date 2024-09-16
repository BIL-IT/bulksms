import { Injectable } from '@nestjs/common';

@Injectable()
export class SmsClientService {
  async sendMessage(
    to: string,
    message: string,
    from?: string,
    branchCode?: string | null | undefined,
    partyCode?: string | null | undefined,
    type?: string | null | undefined,
  ) {
    const encodedMessage = encodeURIComponent(message);
    const content = message + '\n\n -From Bhutan Insurance Limited';
    const uuid = crypto.randomUUID();
    const recipientNumber = to.startsWith('975') ? to : '975' + to;
    const extractedNumber = recipientNumber.substring(
      3,
      recipientNumber.length,
    );

    const encodedURL = encodeURIComponent(
      `https://172.16.16.108:2001/dlr?message_id=${uuid}&report=%d&recipient=${to}&message=${encodedMessage}&branch_code=${branchCode || ''}&party_code=${partyCode || ''}&type=${type || ''}`,
    );
    try {
      const res = await fetch(
        `http://localhost:13013/cgi-bin/sendsms?smsc=${extractedNumber.startsWith('77') ? 'TBIL' : 'BIL'}&username=sms&password=sms123&to=${recipientNumber}&from=${from ?? 'BIL'}&text=${content}&dlr-mask=31&dlr-url=${encodedURL}`,
      );

      const status = await res.text();
      return { content, status };
    } catch (error) {
      return { content: null, status: null };
    }
  }
}
