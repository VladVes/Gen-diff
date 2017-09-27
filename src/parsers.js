import yaml from 'js-yaml';

const parsersMap = {
  json: data => JSON.parse(data),
  yml: data => yaml.safeLoad(data),
};

export default type => parsersMap[type];
