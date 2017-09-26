import genDiff from '../src/';

describe('compare files (it is now json) using imported genDiff', () => {
  const expected = `{\n   host: hexlet.io\n - timeout: 50\n - timeout: 20\n - proxy: 123.234.53.22\n + verbose: true\n}`;
  it('should work', () => {
    expect(genDiff('./__tests__/json/before.json', './__tests__/json/after.json')).toBe(expected);
  });
});
