import _ from 'lodash';

export default (first, second) => {
  const keys = _.uniq(Object.keys(first).concat(Object.keys(second)));

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
