import { Body, Controller, Post, Res } from '@nestjs/common';
import { SendSmsService } from './send-sms.service';
import { MessageDetail } from './input/message-detail.input';
import { Response } from 'express';
import { z } from 'zod';

const messageSchema = z.object({
  message: z.string().min(1),
  to: z.string().min(1),
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
