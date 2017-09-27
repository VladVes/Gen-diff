import { getFileContents } from './tools';
import yaml from 'js-yaml';

const yml = (pathToFile) => {
  const firstConfig = yaml.safeLoad(getFileContents(pathToFile));
  return data;
};

const json = (pathToFile) => {
  const data = JSON.parse(getFileContents(pathToFile));
  return data;
};

export default { yml, json };
