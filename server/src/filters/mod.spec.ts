import { parseQueries, CourseFilter, GenderFilter } from './mod';

describe('StudentDataController', () => {
  it('Test valid Queries.', () => {
    expect(parseQueries('male', 'applied-general,a-level')).toStrictEqual([
      CourseFilter.appgeneral,
      CourseFilter.alevel,
      GenderFilter.Male,
    ]);
  });
  it('Test null Queries.', () => {
    expect(parseQueries(null, 'applied-general,a-level')).toStrictEqual([
      CourseFilter.appgeneral,
      CourseFilter.alevel,
    ]);
  });
  it('Test typos in Queries.', () => {
    expect(() =>
      parseQueries(
        'male',
        'applied-general,a-levesl', // The typo
      ),
    ).toThrowError();
  });
});
