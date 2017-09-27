import genDiff from '../src/';

describe('compare files using imported genDiff', () => {
  const expected = `{\n   host: hexlet.io\n - timeout: 50\n - timeout: 20\n - proxy: 123.234.53.22\n - name: Sam\n - name: john\n + language: eng\n + verbose: true\n}`;
  const fixtures = './__tests__/fixtures';
  const before = `${fixtures}/before`;
  const after = `${fixtures}/after`;

  it('should work whith JSON', () => {
    expect(genDiff(`${before}.json`, `${after}.json`)).toBe(expected);
  });

  it('should work whith YAML', () => {
    expect(genDiff(`${before}.yml`, `${after}.yml`)).toBe(expected);
  });

  it('should work whith INI', () => {
    expect(genDiff(`${before}.ini`, `${after}.ini`)).toBe(expected);
  });
});
