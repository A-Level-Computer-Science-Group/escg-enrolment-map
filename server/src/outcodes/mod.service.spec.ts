import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/common';
import { OutcodesService } from './mod.service';

describe('StudentDataController', () => {
  let Service: OutcodesService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [OutcodesService],
    }).compile();

    Service = app.get<OutcodesService>(OutcodesService);
  });

  it('These outcodes should always return the same correct coordinates.', async () => {
    await expect(Service.getOutcodeData('bn22')).resolves.toStrictEqual({
      coordinates: {
        latitude: 50.7895940563036,
        longitude: 0.283827396572828,
      },
      outcode: 'BN22',
    });
    await expect(Service.getOutcodeData('TN39')).resolves.toStrictEqual({
      coordinates: {
        latitude: 50.8468075416666,
        longitude: 0.451401050595238,
      },
      outcode: 'TN39',
    });
    await expect(Service.getOutcodeData('    Tn39  ')).resolves.toStrictEqual({
      coordinates: {
        latitude: 50.8468075416666,
        longitude: 0.451401050595238,
      },
      outcode: 'TN39',
    });
  });
  it('Invalid outcodes should throw an error.', async () => {
    await expect(
      Service.getOutcodeData('invalid_postcode_test'),
    ).rejects.toThrowError();
  });
});
