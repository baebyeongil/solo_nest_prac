import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  root(@Res() response: Response) {
    // HTML 파일을 제공
    response.sendFile('index.html', { root: 'public/html' });
  }
}
