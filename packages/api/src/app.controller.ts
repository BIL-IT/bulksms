import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req: Request): object {
    console.log('Here');

    console.log(req.query);

    return { ...req.query };
  }

  @Get('/dlr')
  getReport(@Req() req: Request) {
    console.log(req.query);

    return { ...req.query };
  }
}
