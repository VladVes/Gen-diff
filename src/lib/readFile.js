import fs from 'fs';

export default (path) => {
  const fileContent = fs.readFileSync(path, 'utf8');
  return fileContent;
};
