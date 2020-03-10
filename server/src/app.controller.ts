import { Controller, Get, Query } from '@nestjs/common';
import { students, Student } from './data/mod';

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

interface Unimplemented {
  error: string;
  args: unknown;
}

function unimplemented<T>(_args: T): Unimplemented {
  return { error: 'Unimplemented', args: _args };
}
