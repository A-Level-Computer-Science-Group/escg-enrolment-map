import { Test, TestingModule } from '@nestjs/testing';
import { StudentDataController } from './app.controller';

describe('StudentDataController', () => {
  let appController: StudentDataController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StudentDataController],
    }).compile();

    appController = app.get<StudentDataController>(StudentDataController);
  });

  describe('root', () => {
    it('', () => {
      expect(appController.get());
    });
  });
});
