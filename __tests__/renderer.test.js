import { render } from '../src/genDiffLib';

describe('render to string format', () => {
  const expected1 = '{\n   key1: value1\n   key2: value2\n}';
  it('should match', () => {
    const data = {
      key1: ['identical', 'value1'],
      key2: ['identical', 'value2']
    };
    expect(render(data)).toBe(expected1);
  });

  const expected2 = '{\n   key1: value1\n + key2: value2\n}';
  it('should match', () => {
    const data = {
      key1: ['identical', 'value1'],
      key2: ['added', 'value2']
    };
    expect(render(data)).toBe(expected2);
  });
});
