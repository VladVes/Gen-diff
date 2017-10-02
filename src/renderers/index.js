import flat from './flat';
import standart from './standart';
import json from './json';

const renderers = {
  flat,
  json,
  standart,
};

export default format => renderers[format];
