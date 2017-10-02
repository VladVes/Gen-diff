import fs from 'fs';
import genDiff from '../src/';

describe('compare files using imported genDiff', () => {
  const fixtures = './__tests__/fixtures';
  const before = `${fixtures}/before`;
  const after = `${fixtures}/after`;
  const expected = fs.readFileSync(`${fixtures}/correct.txt`, 'utf8');


  it('should work whith JSON', () => {
    expect(genDiff(`${before}.json`, `${after}.json`)).toBe(expected);
  });

  it('should work whith YAML', () => {
    expect(genDiff(`${before}.yml`, `${after}.yml`)).toBe(expected);
  });

  it('should work whith INI', () => {
    expect(genDiff(`${before}.ini`, `${after}.ini`)).toBe(expected);
  });

  const expectedFlat1 = fs.readFileSync(`${fixtures}/correctFlat1.txt`, 'utf8');
  it('should work whith JSON - for flat output', () => {
    expect(genDiff(`${before}.json`, `${after}.json`, 'flat')).toBe(expectedFlat1);
  });

  const expectedJson = {
    common: { status: 'nested', value: {
      setting1: { status: 'default', value: 'Value 1' },
      setting2: { status: 'removed', value: '200' },
      setting3: { status: 'default', value: true },
      setting6: { status: 'removed', value: { key: 'value' } },
      setting4: { status: 'added', value: 'blah blah' },
      setting5: { status: 'added', value: { key5: 'value5' } },
      }
    },
    group1: { status: 'nested', value: {
      baz: { status: 'modified', newValue: 'bars', oldValue: 'bas' },
      foo: { status: 'default', value: 'bar' },
      }
    },
    group2: { status: 'removed', value: { abc: '12345' } },
    group3: { status: 'added', value: { fee: '100500' } },
  };

  it('should work whith JSON - for flat output', () => {
    expect(genDiff(`${before}.json`, `${after}.json`, 'json')).toBe(JSON.stringify(expectedJson));
  });
});
