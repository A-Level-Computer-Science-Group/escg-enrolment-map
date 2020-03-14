import {
  HttpService,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
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

  async getOutcodeData(_outcode: string): Promise<OutcodeInfo> {
    let outcode = _outcode.trim().toUpperCase();
    let response;
    try {
      response = await this.httpService
        .get(`https://api.postcodes.io/outcodes/${outcode}`)
        .toPromise();
    } catch {
      if (outcode == 'ZZ99') {
        response = null; // Known invalid outcode.
      } else {
        throw new HttpException(
          `Invalid outcode ${outcode}`,
          HttpStatus.FORBIDDEN,
        );
      }
    }
    const dataResult = response?.data['result'];
    return {
      outcode,
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
