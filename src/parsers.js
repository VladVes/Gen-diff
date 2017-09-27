import yaml from 'js-yaml';
import { getFileContents } from './genDiffLib';

const yml = (pathToFile) => {
  const data = yaml.safeLoad(getFileContents(pathToFile));
  return data;
};

const json = (pathToFile) => {
  const data = JSON.parse(getFileContents(pathToFile));
  return data;
};

export default { yml, json };
