import _ from 'lodash';

export default (format) => {
  const renderers = {
    flat: (data) => {
      /*
      const getFullPropName = (prop) => {
      };

      const makeDesc = (prop) => {
        const value = prop.hasChild ? 'copmlex value' : `value: ${prop.value}\n`;
        const name = `Property '${prop.name}'`;
        const cmpResultMap = {
          modified: `${name} was updated From ${prop.value} to ${prop.newValue}\n`,
          removed: `${name} was removed\n`,
          added: `${name} was added with ${value}\n`,
        };

        return cmpResultMap[prop.status];
      };

      const getChangedProps = (config) => {
        const result = config.reduce((acc, prop) => {
          if (prop.status !== 'default') {
            const descStr = `${makeDesc(prop)}`;
            return [...acc, descStr];

            if(prop.hasChild) {
              const descStr = `'${prop.name}' `;
              return
            }
          }

          return acc;
        }, []);
      };

      const toString = (config) => {

          const result = onlyWithChanges.reduce();

        return result;
      };

      return toString();
    */
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
