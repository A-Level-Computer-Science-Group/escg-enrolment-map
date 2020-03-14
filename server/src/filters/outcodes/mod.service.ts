import { HttpService, Injectable } from '@nestjs/common';
interface Coordinates {
  latitude: number;
  longitude: number;
}

interface OutcodeInfo {
  outcode: string;
  coordinates: Coordinates | null;
}

@Injectable()
export class OutcodesService {
  constructor(private readonly httpService: HttpService) {}

  async getOutcodeData(outcode: string): Promise<OutcodeInfo> {
    let response;
    try {
      response = await this.httpService
        .get(`https://api.postcodes.io/outcodes/${outcode}`)
        .toPromise();
    } catch {
      response = null;
    }
    const dataResult = response?.data['result'];
    return {
      outcode: outcode.trim().toUpperCase(),
      coordinates:
        dataResult == null
          ? null
          : {
              latitude: dataResult['latitude'],
              longitude: dataResult['longitude'],
            },
    };
  }
}
