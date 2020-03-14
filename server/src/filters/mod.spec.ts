import {
  parseQueries,
  GenderFilter,
  CourseFilters,
  ApplyableFilter,
} from './mod';

describe('StudentDataController', () => {
  it('Test valid Queries.', () => {
    expect(parseQueries('male', 'applied-general,a-level')).toStrictEqual<
      ApplyableFilter[]
    >([
      new CourseFilters(['applied-general', 'a-level']),
      new GenderFilter('male'),
    ]);
  });
  it('Test null Queries.', () => {
    expect(parseQueries(undefined, 'applied-general,a-level')).toStrictEqual<
      ApplyableFilter[]
    >([new CourseFilters(['applied-general', 'a-level'])]);
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
