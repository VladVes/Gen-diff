import _ from 'lodash';

export default (format) => {
  const renderers = {
    flat: (data) => {
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
    },

    standart: (data) => {
      const cmpStatus = {
        default: '  ',
        nested: '  ',
        removed: '- ',
        added: '+ ',
        modified: {
          value: '- ',
          newVal: '+ ',
        },
      };

      const objectToString = (obj, idention) => {
        return _.keys(obj).map((key) => {
          if (_.isObject(obj[key])) {
            const nestedStr = objectToString(obj[key], `${idention}  `);
            return `\n${idention}${idention}    ${key}: {${nestedStr}\n${idention}${idention}    }`;
          }
          return `\n${idention}${idention}    ${key}: ${obj[key]}`;
        }).join('');
      };

      const toString = (configData, idention = '') => {
        const result = configData.map((item) => {
          const sign = cmpStatus[item.status];
          const name = item.key;
          if (item.status === 'nested') {
            const childStr = toString(item.children, `${idention}    `);
            return `\n${idention}  ${sign}${name}: ${childStr}`;
          }

          if (item.status === 'modified') {
            const firstStr = `\n${idention}  ${sign.newVal}${name}: ${item.newValue}`;
            const secondStr = `\n${idention}  ${sign.value}${name}: ${item.value}`;
            return firstStr + secondStr;
          }

          if (_.isObject(item.value)) {
            const newIdention = idention || '  ';
            const complexData = objectToString(item.value, newIdention);
            return `\n${idention}  ${sign}${name}: {${complexData}\n${idention}    }`;
          };

          return `\n${idention}  ${sign}${name}: ${item.value}`;
        }).join('');

        return `{${result}\n${idention}}`;
      };

      return `${toString(data)}\n`;
    },
  };

  return renderers[format];
};
