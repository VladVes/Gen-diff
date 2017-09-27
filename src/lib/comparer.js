import _ from 'lodash';

export default (first, second) => {
  const keys = _.uniq(Object.keys(first).concat(Object.keys(second)));

  return keys.reduce((acc, key) => {
    const value1 = firstConfig[key];
    const value2 = secondConfig[key];
    if (_.has(firstConfig, key) && _.has(secondConfig, key)) {
      acc[key] = value1 === value2 ? ['identical', value1] : ['modified', value1, value2];
    }

    if (_.has(firstConfig, key) && !_.has(secondConfig, key)) {
      acc[key] = ['removed', value1];
    } else {
      acc[key] = ['added', value2];
    }

    return acc;
  }, {});
};
