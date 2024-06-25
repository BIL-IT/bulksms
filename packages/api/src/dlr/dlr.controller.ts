import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { DlrService } from './dlr.service';

/*
  queries['message_id'];
  queries['report'];
  queries['recipient'];
  queries['message'];
*/

@Controller('/dlr')
export class DlrController {
  constructor(private dlrService: DlrService) {}
  @Get('')
  async handleDLR(@Req() request: Request, @Res() response: Response) {
    try {
      const queries = { ...request.query };

      const message_id = queries['message_id'] as string;
      const report = queries['report'] as string;
      const recipient = queries['recipient'] as string;
      const message = queries['message'] as string;
      const branchCode = queries['branch_code'] as string | null | undefined;
      const partyCode = queries['party_code'] as string | null | undefined;
      const type = queries['type'] as string | null | undefined;

      const storeMessage = await this.dlrService.handleDLR(
        report,
        message_id,
        recipient,
        message,
        branchCode,
        partyCode,
        type,
      );

      if (!storeMessage) {
        return response.status(404);
      }

      return response.status(200).send({ queries });
    } catch (error) {
      throw new Error(error);
    }
  }
}
