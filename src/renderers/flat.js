import _ from 'lodash';

export default (data) => {
  const makeDesc = (prop) => {
    const value = _.isObject(prop.value) ? 'copmlex value' : `value: ${prop.value}`;
    const cmpResultMap = {
      modified: ` was updated From ${prop.value} to ${prop.newValue}\n`,
      removed: `was removed\n`,
      added: `was added with ${value}\n`,
    };

    return cmpResultMap[prop.status];
  };

  const toString = (config, ...rest) => {
    const parents = `${rest.join('.')}`;
    return config.reduce((acc, prop) => {
      if (prop.status !== 'default') {
        if (prop.status === 'nested') {
          const descStr = toString(prop.children, prop.key);
          return [...acc, descStr];
        }
        const dot = parents ? `.` : ``;
        const descStr = `Property '${parents}${dot}${prop.key}' ${makeDesc(prop)}`;
        return [...acc, descStr];
      }
      return acc;
    }, []).join('');
  };

  return toString(data);
};
