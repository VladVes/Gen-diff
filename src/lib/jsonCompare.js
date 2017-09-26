import fs from 'fs';
import _ from 'lodash';

export default (left, right) => {
  const firesConfig = JSON.parse(fs.readFileSync(left, 'utf8'));
  const secondConfig = JSON.parse(fs.readFileSync(right, 'utf8'));

  const result = _.has(firesConfig, 'host');

  return (firstConfig);
}
