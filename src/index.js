import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';
import getRenderer from './renderers';

const getType = pathTofile => path.extname(pathTofile).slice(1);

const parse = (data, type) => {
  const parsersMap = {
    json: data1 => JSON.parse(data1),
    yml: data2 => yaml.safeLoad(data2),
    ini: data3 => ini.parse(data3),
  };

  return parsersMap[type](data);
};

const getData = (pathToFile) => {
  const fileContent = fs.readFileSync(pathToFile, 'utf8');
  const fileType = getType(pathToFile);
  return parse(fileContent, fileType);
};

export const compare = (dataBefore, dataAfter) => {
  const beforeKeys = _.keys(dataBefore);
  const afterKeys = _.keys(dataAfter);

  return _.union(beforeKeys, afterKeys).map((key) => {
    if (beforeKeys.includes(key) && afterKeys.includes(key)) {
      if (_.isEqual(dataBefore[key], dataAfter[key])) {
        return { key, status: 'default', value: dataBefore[key] };
      }

      if (_.isObject(dataBefore[key]) && _.isObject(dataAfter[key])) {
        const children = compare(dataBefore[key], dataAfter[key]);
        return { key, status: 'nested', children };
      }
    }

    if (!beforeKeys.includes(key)) {
      return { key, status: 'added', value: dataAfter[key] };
    } else if (!afterKeys.includes(key)) {
      return { key, status: 'removed', value: dataBefore[key] };
    }

    return {
      key,
      status: 'modified',
      value: dataBefore[key],
      newValue: dataAfter[key]
    };
  });
};

export default (pathToFile1, pathToFile2, outputFormat = 'standart') => {
  const data1 = getData(pathToFile1);
  const data2 = getData(pathToFile2);
  return getRenderer(outputFormat)(compare(data1, data2));
};
