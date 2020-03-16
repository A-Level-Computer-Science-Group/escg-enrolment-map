import { parseQueries, GenderFilter, CourseFilters, Filters } from './mod';

describe('StudentDataController', () => {
  it('Test valid Queries.', () => {
    expect(parseQueries('male', 'applied-general,a-level')).toStrictEqual<
      Filters
    >({
      courseFilters: new CourseFilters(['applied-general', 'a-level']),
      genderFilter: new GenderFilter('male'),
    });
  });
  it('Test null Queries.', () => {
    expect(parseQueries(undefined, 'applied-general,a-level')).toStrictEqual<
      Filters
    >({
      courseFilters: new CourseFilters(['applied-general', 'a-level']),
      genderFilter: undefined,
    });
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
