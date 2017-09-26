import fs from 'fs';
import _ from 'lodash';

export default (left, right) => {
  const firstConfig = JSON.parse(fs.readFileSync(left, 'utf8'));
  const secondConfig = JSON.parse(fs.readFileSync(right, 'utf8'));

  const keys = _.uniq(Object.keys(firstConfig).concat(Object.keys(secondConfig)));
  //console.log("all KEYS: ", keys);

  const result = keys.reduce((acc, key) => {
    if (_.has(firstConfig, key) && _.has(secondConfig, key)) {
      if (firstConfig[key] === secondConfig[key]) {
        acc += `  ${key}: ${firstConfig[key]}\n`;
      } else {
        acc += ` - ${key}: ${firstConfig[key]}\n`;
        acc += ` - ${key}: ${secondConfig[key]}\n`;
      }
      return acc;
    }
    if (_.has(firstConfig, key) && !_.has(secondConfig, key)) {
      acc += ` - ${key}: ${firstConfig[key]}\n`;
    } else {
      acc += ` + ${key}: ${secondConfig[key]}\n`;
    }

    return acc;
  }, '');

  return `{\n ${result}\n}`;
};
