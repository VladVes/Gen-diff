import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';
import ConfigAst from './ConfigAst';
import Context from './Context';

const compare = (dataBefore, dataAfter) => {
  const config = new ConfigAst().createOn(dataBefore);
  return config.compareWith(new ConfigAst().createOn(dataAfter));
};

const getFileContents = (path) => {
  const fileContent = fs.readFileSync(path, 'utf8');
  return fileContent;
};

const getRenderer = (data, outputFormat) => {
    const toString = (config, idention = '') => {
      const properties = config.getAllProerties();
      const cmpResultMap = {
        modified: {
          forNewVal: '+ ',
          forPrevVal: '- ',
        },
        removed: '- ',
        added: '+ ',
        noChange: '  ',
      };
      const result = properties.map((name) => {
        const property = config.getProperty(name);
        const sign = cmpResultMap[property.comparsionResult];
        if (property.hasChild) {
          const childString = toString(config.getChild(name), `${idention}    `);
          return `\n${idention}  ${sign}${name}: ${childString}`;
        }

        if (property.comparsionResult === 'modified') {
          const firstStr = `\n${idention}  ${sign.forNewVal}${name}: ${property.newValue}`;
          const secondStr = `\n${idention}  ${sign.forPrevVal}${name}: ${property.value}`;
          return firstStr + secondStr;
        }

        return `\n${idention}  ${sign}${name}: ${property.value}`;
      }).join('');

      return `{${result}\n${idention}}`;
    };

    const flat = (config) => {
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

            const result = onlyWithChanges.reduce()

          return result;
        };

        return toString();
    };

    const renderMap = {
      flat,
      default: toString,
    };

    return new Context(data, renderMap[outputFormat]);
};

const parserMap = {
  json: data => JSON.parse(data),
  yml: data => yaml.safeLoad(data),
  ini: data => ini.parse(data),
};

const getParser = type => parserMap[type];

export { compare, getParser, getRenderer, getFileContents };
