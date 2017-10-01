import _ from 'lodash';

export default (format) => {
  const renderers = {
    flat: (data) => {
      /*
      const getFullPropName = (prop) => {

      };
      const makeCmpResultDesc = (prop) => {
        const value = prop.hasChild ? 'copmlex value' : `value: ${prop.value}`
        const cmpResultMap = {
          modified: `was updated From ${prop.value} to ${prop.newValue}`,
          removed: `was removed`,
          added: `was added with ${value}`,
          noChange: 'noChange',
        };

        return cmpResultMap[prop.comparsionResult];
      };

      const getChangedProps = (config) => {
        const result = Objec.keys(config).reduce((acc, name) => {
          const prop = config.getProperty(name);
          if (prop.hasChild) {
            const chengedProps = getChangedProps(config.getChild(name));
            return [...acc, chengedProps];
          }

          if (prop.comparsionResult !== 'noChange') {
            return [...acc, prop];
          }
          return acc;
        }, []);
      };

      const toString = (config) => {

          const result = onlyWithChanges.reduce();

        return result;
      };

      return toString();
    },
    */
    
    standart: (data) => {
      const cmpStatus = {
        default: '  ',
        parent: '  ',
        removed: '- ',
        added: '+ ',
        modified: {
          value: '- ',
          newVal: '+ ',
        },
      };

      const toString = (configData, idention = '') => {
          const result = configData.map((item) => {
          const sign = cmpStatus[item.status];
          const name = item.key;
          if (item.hasChild) {
            const childStr = toString(item.value, `${idention}    `);
            return `\n${idention}  ${sign}${name}: ${childStr}`;
          }

          if (item.status === 'modified') {
            const firstStr = `\n${idention}  ${sign.newVal}${name}: ${item.newValue}`;
            const secondStr = `\n${idention}  ${sign.value}${name}: ${item.value}`;
            return firstStr + secondStr;
          }

          return `\n${idention}  ${sign}${name}: ${item.value}`;
        }).join('');

        return `{${result}\n${idention}}`;
        };

      const result = toString(data);
    //  console.log(result);
      return toString(data);
    },
  };

  return renderers[format];
};
