import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';

@Injectable()
export class SendOtpService {
  async sendOTP(phoneNumber: string) {
    try {
      if (!phoneNumber) console.log('Phone number is not defined');

      const secretCode = '123';
      const hashedSecretCode = await argon.hash(secretCode);
      return hashedSecretCode;
    } catch (error) {
      throw new Error(error);
    }
  }
}
