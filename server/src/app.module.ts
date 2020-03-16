import { Module, HttpModule } from '@nestjs/common';
import {
  StudentDataController,
  SchoolsDataController,
  OutcodesDataController,
} from './app.controller';
import { AppService } from './app.service';
import { OutcodesService } from './outcodes/mod.service';

@Module({
  imports: [HttpModule],
  controllers: [
    StudentDataController,
    SchoolsDataController,
    OutcodesDataController,
  ],
  providers: [AppService, OutcodesService],
})
export class AppModule {}
