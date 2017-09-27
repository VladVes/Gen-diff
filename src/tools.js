import fs from 'fs';
import _ from 'lodash';

const compare = (first, second) => {
  const keys = _.union(Object.keys(first), Object.keys(second));

  return keys.reduce((acc, key) => {
    const value1 = first[key];
    const value2 = second[key];
    if (_.has(first, key) && _.has(second, key)) {
      acc[key] = value1 === value2 ? ['identical', value1] : ['modified', value1, value2];
      return acc;
    }

    if (_.has(first, key) && !_.has(second, key)) {
      acc[key] = ['removed', value1];
    } else {
      acc[key] = ['added', value2];
    }

    return acc;
  }, {});
};

const render = (data) => {
  const result = Object.keys(data).reduce((acc, key) => {
    const [ status, value1, value2 ] = data[key];
    switch (status) {
      case 'identical':
        acc += `   ${key}: ${value1}\n`;
        break;
      case 'modified':
        acc += ` - ${key}: ${value1}\n`;
        acc += ` - ${key}: ${value2}\n`;
        break;
      case 'removed':
        acc += ` - ${key}: ${value1}\n`;
        break;
      case 'added':
        acc += ` + ${key}: ${value1}\n`;
        break;
    }

    return acc;
  }, '');

  return `{\n${result}}`;
};

const getFileContents = (path) => {
  const fileContent = fs.readFileSync(path, 'utf8');
  return fileContent;
};

export { compare, render, getFileContents };
