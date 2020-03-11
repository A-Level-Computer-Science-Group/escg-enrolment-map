import { Controller, Get, Query } from '@nestjs/common';
import { students, Student } from './data/mod';
import { Unimplemented, unimplemented } from './unimplemented';

@Controller('student-data')
export class StudentDataController {
  @Get()
  get(): Student[] {
    return students;
  }
}
@Controller('student-data/schools')
export class SchoolsDataController {
  @Get()
  get(@Query('gender') gender, @Query('course') course): Unimplemented {
    return unimplemented([gender, course]);
  }
}
@Controller('student-data/outcodes')
export class OutcodesDataController {
  @Get()
  get(@Query('gender') gender, @Query('course') course): Unimplemented {
    return unimplemented([gender, course]);
  }
}
