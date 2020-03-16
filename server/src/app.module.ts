import { Module, HttpModule } from '@nestjs/common';
import {
  StudentDataController,
  SchoolsDataController,
  OutcodesDataController,
} from './app.controller';
import { OutcodesService } from './filters/outcodes/mod.service';
import { StudentsFromOutcodesService } from './filters/studentsFromOutcodes.service';

@Module({
  imports: [HttpModule],
  controllers: [
    StudentDataController,
    SchoolsDataController,
    OutcodesDataController,
  ],
  providers: [OutcodesService, StudentsFromOutcodesService],
})
export class AppModule {}
