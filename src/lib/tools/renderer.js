import _ from 'lodash';

export default (data) => {

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
