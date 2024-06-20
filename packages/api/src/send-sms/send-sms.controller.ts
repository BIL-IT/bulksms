import { Body, Controller, Post, Res } from '@nestjs/common';
import { SendSmsService } from './send-sms.service';
import { MessageDetail } from './input/message-detail.input';
import { Response } from 'express';
import { z } from 'zod';
import * as argon from 'argon2';

const password =
  '$argon2id$v=19$m=65536,t=3,p=4$o9z1p/M1VRHCjG7mk6DQXA$mxzEF7TKdhQlLxZ7YSO3zBvpYCY8FPgFijxqNepokbg';

const messageSchema = z.object({
  message: z.string().min(1),
  to: z.string().min(1),
  password: z.string().min(1),
});

@Controller('send-sms')
export class SendSmsController {
  constructor(private sendSmsService: SendSmsService) {}

  @Post()
  async sendSms(
    @Body() messageDetail: MessageDetail,
    @Res() response: Response,
  ) {
    try {
      const parsedMessage = messageSchema.parse(messageDetail);

      const isVerified = await argon.verify(password, parsedMessage.password);

      if (!isVerified) {
        response.status(401).json({
          message: 'Unsuccessfull',
          error: 'Invalid Password',
        });

        return;
      }

      await this.sendSmsService.sendSMS(
        parsedMessage.message,
        parsedMessage.to,
      );

      response.status(200).json({
        message: 'Successfull',
      });
    } catch (error) {
      response.status(401).json({
        message: 'Unsuccessfull',
        error,
      });
    }
  }
}
