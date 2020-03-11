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

  async get_outcode_data(outcode: string): Promise<OutcodeInfo> {
    const response = await this.httpService
      .get(`https://api.postcodes.io/outcodes/${outcode}`)
      .toPromise();
    const response_data = response.data;
    const data_result = response_data['result'];
    return {
      outcode: data_result['outcode'],
      coordinates: {
        latitude: data_result['latitude'],
        longitude: data_result['longitude'],
      },
    };
  }
}
