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
  const renderedData = Object.keys(data).reduce((acc, key) => {
    const [status, value1, value2] = data[key];
    switch (status) {
      case 'identical':
        return [...acc, `   ${key}: ${value1}\n`];
      case 'modified':
        return [...acc, ` - ${key}: ${value1}\n`, ` - ${key}: ${value2}\n`];
      case 'removed':
        return [...acc, ` - ${key}: ${value1}\n`];
      case 'added':
        return [...acc, ` + ${key}: ${value1}\n`];
      default:
        throw new Error('Render error: unknonw property status');
    }
  }, []).join('');

  return `{\n${renderedData}}`;
};

const getFileContents = (path) => {
  const fileContent = fs.readFileSync(path, 'utf8');
  return fileContent;
};

export { compare, render, getFileContents };
