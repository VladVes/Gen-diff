import path from 'path';
import { compare, getParser, getRenderer, getFileContents } from './genDiffLib';

export default (pathToFile1, pathToFile2, outputFormat = 'default') => {
  if (path.extname(pathToFile1) === path.extname(pathToFile2)) {
    const fileType = path.extname(pathToFile1).slice(1);
    const parse = getParser(fileType);
    const data1 = getFileContents(pathToFile1);
    const data2 = getFileContents(pathToFile2);
    const cmpResult = compare(parse(data1), parse(data2));
    const renderer = getRenderer(cmpResult, outputFormat);
    return renderer.execute();
  }

  throw new Error('unknonw config file');
};
