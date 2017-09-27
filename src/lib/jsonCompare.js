import tool from './tools/';

export default (firstFile, secondFile) => {
  const firstConfig = tool.parse.json(tool.getContents(firstFile));
  const secondConfig = tool.parse.json(tool.getContents(secondFile));
  const result = tool.compare(firstConfig, secondConfig);
  return tool.render(result);
};
