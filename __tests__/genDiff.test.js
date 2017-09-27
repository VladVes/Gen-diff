import genDiff from '../src/';

describe('compare files using imported genDiff', () => {
  const expected = `{\n   host: hexlet.io\n - timeout: 50\n - timeout: 20\n - proxy: 123.234.53.22\n - name: Sam\n - name: john\n + language: eng\n + verbose: true\n}`;

  it('should work whith JSON', () => {
    expect(genDiff('./__tests__/fixtures/before.json', './__tests__/fixtures/after.json')).toBe(expected);
  });

  it('should work whith YAML', () => {
    expect(genDiff('./__tests__/fixtures/before.yml', './__tests__/fixtures/after.yml')).toBe(expected);
  });

  it('should work whith INI', () => {
    expect(genDiff('./__tests__/fixtures/before.ini', './__tests__/fixtures/after.ini')).toBe(expected);
  });
});
