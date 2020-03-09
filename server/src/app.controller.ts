import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { students, Student } from './data/mod';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Student[] {
    return students;
  }
}
