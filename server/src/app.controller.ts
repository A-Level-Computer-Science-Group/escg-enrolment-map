import { Controller, Get } from '@nestjs/common';
import { students, Student } from './data/mod';

@Controller('student-data')
export class StudentDataController {
  @Get()
  get(): Student[] {
    return students;
  }
}
