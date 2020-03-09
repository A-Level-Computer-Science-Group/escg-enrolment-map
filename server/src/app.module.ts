import { Module } from '@nestjs/common';
import { StudentDataController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [StudentDataController],
  providers: [AppService],
})
export class AppModule {}
