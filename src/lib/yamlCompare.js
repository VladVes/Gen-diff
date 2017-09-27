import tool from './tools/';

export default (firstFile, secondFile) => {
  const firstConfig = tool.parse.yaml(tool.getContents(firstFile));
  const secondConfig = tool.parse.yaml(tool.getContents(secondFile));
  const result = tool.compare(firstConfig, secondConfig);
  return tool.render(result);
};
