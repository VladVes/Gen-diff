import yaml from 'js-yaml';

const parsersMap = {
  json: (data) => JSON.parse(data),
  yml: (data) => yaml.safeLoad(data),
  ini: (data) => {}
};

export default (type) => parsersMap[type];
