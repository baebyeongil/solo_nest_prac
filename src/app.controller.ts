import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(@Res() response: Response) {
    // HTML 파일을 제공
    response.sendFile('index.html', { root: 'src/public/html' });
  }
}
