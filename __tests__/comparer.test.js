import { compare } from '../src/genDiffLib';

describe('compare parsed configs', () => {
  const expected1 = {
    key1: ['identical', 'value1'],
    key2: ['modified', 'value2', 'anotherValue']
  };
  it('should be modified', () => {
    const before = { key1: 'value1', key2: 'value2' };
    const after = { key1: 'value1', key2: 'anotherValue' };
    expect(compare(before, after)).toEqual(expected1);
  });

  const expected2 = {
    key1: ['identical', 'value1'],
    key2: ['identical', 'value2'],
    key3: ['added', 'value3']
  };
  it('should be added', () => {
    const before = { key1: 'value1', key2: 'value2' };
    const after = { key1: 'value1', key2: 'value2', key3: 'value3' };
    expect(compare(before, after)).toEqual(expected2);
  });

  const expected3 = {
    key1: ['identical', 'value1'],
    key2: ['removed', 'value2'],
    key3: ['identical', 'value3']
  };
  it('should be removed', () => {
    const before = { key1: 'value1', key2: 'value2', key3: 'value3' };
    const after = { key1: 'value1', key3: 'value3' };
    expect(compare(before, after)).toEqual(expected3);
  });
});
