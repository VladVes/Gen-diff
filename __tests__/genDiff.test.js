import fs from 'fs';
import genDiff from '../src/';

describe('compare files using imported genDiff', () => {
  const fixtures = './__tests__/fixtures';
  const before = `${fixtures}/before`;
  const after = `${fixtures}/after`;
  const expected = fs.readFileSync(`${fixtures}/correct.txt`, 'utf8');
  //console.log(expected);

  it('should work whith JSON', () => {
    expect(genDiff(`${before}.json`, `${after}.json`) + '\n').toBe(expected);
  });

  it('should work whith YAML', () => {
    expect(genDiff(`${before}.yml`, `${after}.yml`) + '\n').toBe(expected);
  });

  it('should work whith INI', () => {
    expect(genDiff(`${before}.ini`, `${after}.ini`) + '\n').toBe(expected);
  });
});
