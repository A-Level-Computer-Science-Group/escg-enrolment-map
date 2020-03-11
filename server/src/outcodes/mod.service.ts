import { HttpService, Injectable } from '@nestjs/common';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface OutcodeInfo {
  outcode: string;
  coordinates: Coordinates;
}

@Injectable()
export class OutcodesService {
  constructor(private readonly httpService: HttpService) {}

  async getOutcodeData(outcode: string): Promise<OutcodeInfo> {
    const response = await this.httpService
      .get(`https://api.postcodes.io/outcodes/${outcode}`)
      .toPromise();
    const dataResult = response.data['result'];
    return {
      outcode: dataResult['outcode'],
      coordinates: {
        latitude: dataResult['latitude'],
        longitude: dataResult['longitude'],
      },
    };
  }
}
