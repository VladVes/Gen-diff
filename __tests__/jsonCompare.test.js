import compare from '../src/lib/';

const fn = (a, b) => a + b;

describe('compare plain json files', () => {
  const expected1 = `{\n   host: hexlet.io\n - timeout: 50\n - timeout: 20\n - proxy: 123.234.53.22\n + verbose: true\n}`;
  it('should work', () => {
    expect(compare.json('./__tests__/json/before.json', './__tests__/json/after.json')).toBe(expected1);
  });
  const expected2 = '';
  it('should not work', () => {
    expect(compare.json('./__tests__/json/before.json', './__tests__/json/after.json')).not.toBe(expected2);
  });
});
