import path from 'path';
import { compare, render, getFileContents } from './genDiffLib';
import getParser from './parsers';

export default (pathToFile1, pathToFile2) => {
  if (path.extname(pathToFile1) === path.extname(pathToFile2)) {
    const type = path.extname(pathToFile1).slice(1);
    const parse = getParser(type);
    const data1 = getFileContents(pathToFile1);
    const data2 = getFileContents(pathToFile2);
    const cmpResult = compare(parse(data1), parse(data2));
    return render(cmpResult);
  }

  throw new Error('unknonw config file');
};
