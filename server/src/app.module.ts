import { Module, HttpModule } from '@nestjs/common';
import {
  StudentDataController,
  SchoolsDataController,
  OutcodesDataController,
} from './app.controller';
import { OutcodesService } from './outcodes/mod.service';

@Module({
  imports: [HttpModule],
  controllers: [
    StudentDataController,
    SchoolsDataController,
    OutcodesDataController,
  ],
  providers: [OutcodesService],
})
export class AppModule {}
