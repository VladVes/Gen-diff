import yaml from 'js-yaml';

export default (data) => {
  const result = yaml.safeLoad(data);
  return result;
};
