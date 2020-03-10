import { Module } from '@nestjs/common';
import {
  StudentDataController,
  SchoolsDataController,
  OutcodesDataController,
} from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [
    StudentDataController,
    SchoolsDataController,
    OutcodesDataController,
  ],
  providers: [AppService],
})
export class AppModule {}
