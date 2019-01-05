import generateId from './generateId';

const string1 = 'Test 1';
const string2 = 'Test 2';
const result = 'test-1-test-2';

describe('<generateId />', () => {
  it('should return new string that has spaces replaced with hyphens and be lowercase', () => {
    expect(generateId([string1, string2])).toBe(result);
  });
});
