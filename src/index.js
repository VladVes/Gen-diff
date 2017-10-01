import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';
import getRenderer from './renderers'

const getType = pathTofile => path.extname(pathTofile).slice(1);

const parse = (data, type) => {
  const parsersMap = {
    json: data => JSON.parse(data),
    yml: data => yaml.safeLoad(data),
    ini: data => ini.parse(data),
  };

  return parsersMap[type](data);
};

export const prepareData = (data) => {
  return _.keys(data).map((key) => {
    const hasChild = _.isObject(data[key]);
    const preparedProperty = {
      key,
      status: 'default',
      value: hasChild ? prepareData(data[key]) : data[key],
      hasChild,
    }
    return preparedProperty;
  });
};

const getData = (pathToFile) => {
  const fileContent = fs.readFileSync(pathToFile, 'utf8');
  const fileType = getType(pathToFile);
  return prepareData(parse(fileContent, fileType));
};

export const compare = (dataBefore, dataAfter) => {
  const beforeKeys = _.map(dataBefore, 'key');
  const afterKeys = _.map(dataAfter, 'key');
  const result = _.union(beforeKeys, afterKeys).map((key) => {
    if (beforeKeys.includes(key) && afterKeys.includes(key)) {
      const propBefore = _.find(dataBefore, ['key', key]);
      const propAfter = _.find(dataAfter, ['key', key]);
      if (_.isEqual(propBefore.value, propAfter.value)) {
        return propBefore;
      }

      if (_.isArray(propBefore.value) && _.isArray(propAfter.value)) {
        const child = compare(propBefore.value, propAfter.value);
        return { status: 'parent', key, value: child, hasChild: true };
      }
    }

    if (!beforeKeys.includes(key)) {
      const propAfter = _.find(dataAfter, ['key', key]);
      return {
        status: 'added',
        key,
        value: propAfter.value,
        hasChild: propAfter.hasChild,
      };
    } else if (!afterKeys.includes(key)) {
      const propBefore = _.find(dataBefore, ['key', key]);
      return {
        status: 'removed',
        key,
        value: propBefore.value,
        hasChild: propBefore.hasChild,
      };
    }

    return {
      status: 'modified',
      key,
      value: _.find(dataBefore, ['key', key]).value,
      newValue: _.find(dataAfter, ['key', key]).value,
    };
  });
  
  return result;
};

export default (pathToFile1, pathToFile2, outputFormat = 'standart') => {
  const data1 = getData(pathToFile1);
  const data2 = getData(pathToFile2);
  return getRenderer(outputFormat)(compare(data1, data2));
};
