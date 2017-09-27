import getContents from './readFile';
import parse from './parsers/';
import compare from './comparer';
import render from './renderer';

export default (firstFile, secondFile) => {
  const firstConfig = parse.json(getContents(firstFile));
  const secondConfig = parse.json(getContents(secondFile));
  const result = compare(firstConfig, secondConfig);
  return render(result);
};
