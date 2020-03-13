import { Injectable } from '@nestjs/common';
import { OutcodeInfo } from './mod';
import { Student } from '../data/mod';
import { OutcodesService } from './outcodes/mod.service';

@Injectable()
export class StudentsFromOutcodesService {
  constructor(private outcodesService: OutcodesService) {}

  // Counts Students from different outcodes producing `OutcodeInfo[]`
  async studentsFromOutcodes(studnets: Student[]): Promise<OutcodeInfo[]> {
    const dic: { [code: string]: number } = {};
    for (const studnet of studnets) {
      const postcode = studnet.PostCodePart1.trim();
      if (dic[postcode] == null) {
        dic[postcode] = 1;
      } else {
        dic[postcode] += 1;
      }
    }
    const out = [];
    for (const outcode in dic) {
      const numMatchingStudents = dic[outcode];
      const coordinates = await (
        await this.outcodesService.getOutcodeData(outcode)
      ).coordinates;
      out.push({
        outcode,
        coordinates,
        numMatchingStudents,
      });
    }
    return out;
  }
}
