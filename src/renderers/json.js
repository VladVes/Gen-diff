export default (configData) => {

  const prepareData = (data) => {
    return data.reduce((acc, prop) => {
      switch (prop.status) {
        case 'nested':
          const childrens = prepareData(prop.children);
          return { ...acc, [prop.key]: {status: 'nested', value: childrens}};
        case 'modified':
          const modified = {
            status: 'modified',
            newValue: prop.newValue,
            oldValue: prop.value,
          };
          return { ...acc, [prop.key]: modified };
        default:
          return { ...acc, [prop.key]: { status: prop.status, value: prop.value } };
      }
    }, {});
  }

  return JSON.stringify(prepareData(configData));
};
