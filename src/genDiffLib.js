import fs from 'fs';
import ConfigAst from './ConfigAst';

const compare = (dataBefore, dataAfter) => {
  const config = new ConfigAst().createOn(dataBefore);
  return config.compareWith(new ConfigAst().createOn(dataAfter));
};

const render = config => config.toString();

const getFileContents = (path) => {
  const fileContent = fs.readFileSync(path, 'utf8');
  return fileContent;
};

export { compare, render, getFileContents };
