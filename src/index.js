import { compare, render } from './tools';
import parsers from './parsers';
import path from 'path';

export default (file1, file2) => {
  if (path.extname(file1) === path.extname(file2)) {
    const type = path.extname(file1).slice(1);
    const parser = parsers[type];
    const cmpResult = compare(parser(file1), parser(file2));
    return render(cmpResult);
  } else {
    throw new Exception('config type error');
  }
};
