import { parseQueries, Filter } from './mod';

describe('StudentDataController', () => {
  it('Test valid Queries.', () => {
    expect(parseQueries('male', 'applied-general,a-level')).toStrictEqual<
      Filter[]
    >(['applied-general', 'a-level', 'male']);
  });
  it('Test null Queries.', () => {
    expect(parseQueries(null, 'applied-general,a-level')).toStrictEqual<
      Filter[]
    >(['applied-general', 'a-level']);
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
