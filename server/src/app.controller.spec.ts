import { Test, TestingModule } from '@nestjs/testing';
import { StudentDataController } from './app.controller';
import { AppService } from './app.service';

describe('StudentDataController', () => {
  let appController: StudentDataController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StudentDataController],
      providers: [AppService],
    }).compile();

    appController = app.get<StudentDataController>(StudentDataController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.get()).toBe('Hello World!');
    });
  });
});
