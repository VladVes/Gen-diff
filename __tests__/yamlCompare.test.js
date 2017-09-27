import compare from '../src/lib/';

describe('compare plain YAML files', () => {
  const expected1 = `{\n   host: hexlet.io\n - timeout: 50\n - timeout: 20\n - proxy: 123.234.53.22\n + verbose: true\n}`;
  it('should match', () => {
    expect(compare.yaml('./__tests__/yaml/before.yml', './__tests__/yaml/after.yml')).toBe(expected1);
  });
  const expected2 = '';
  it('should not match', () => {
    expect(compare.yaml('./__tests__/yaml/before.yml', './__tests__/yaml/after.yml')).not.toBe(expected2);
  });
});
