import genDiff from '../src/';
import { genDiff2 } from '../src/';

describe('compare files using imported genDiff', () => {
  const expected = `{\n   host: hexlet.io\n - timeout: 50\n - timeout: 20\n - proxy: 123.234.53.22\n + verbose: true\n}`;

  it('should work whith JSON', () => {
    expect(genDiff('./__tests__/json/before.json', './__tests__/json/after.json')).toBe(expected);
  });

  it('should work whith YAML', () => {
    expect(genDiff2('./__tests__/yaml/before.yml', './__tests__/yaml/after.yml')).toBe(expected);
  });
});
