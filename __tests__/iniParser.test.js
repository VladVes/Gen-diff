import ini from 'ini';
import fs from 'fs';

const fixtures = './__tests__/fixtures';
const before = `${fixtures}/before`;
const after = `${fixtures}/after`;

const expected1 = {
  host: 'hexlet.io',
  timeout: '50',
  proxy: '123.234.53.22',
  name: 'Sam',
};

test('shows ini parsing result', () => {
  const result = ini.parse(fs.readFileSync(`${before}.ini`, 'utf8'));
  expect(result).toEqual(expected1);
});
