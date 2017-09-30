import _ from 'lodash';

const createPropBasedOn = (prop, updates = {}) => {
  const { comparsionResult, newValue, child } = updates;
  return {
    name: prop.name,
    comparsionResult: comparsionResult || prop.comparsionResult,
    hasChild: prop.hasChild,
    value: child || prop.value,
    newValue: newValue || prop.newValue,
  };
};

export default class ConfigAst {
  constructor(data) {
    this.data = data || [];
  }

  createOn(data) {
    const astData = Object.keys(data).reduce((acc, key) => {
      const item = {
        name: key,
        comparsionResult: 'noChange',
        newValue: null,
      };

      if (typeof data[key] === 'object') {
        item.hasChild = true;
        item.value = this.createOn(data[key]);
        return [...acc, item];
      }

      item.hasChild = false;
      item.value = data[key];
      return [...acc, item];
    }, []);

    return new ConfigAst(astData);
  }

  find(name) {
    return this.data.find(item => item.name === name);
  }

  hasProperty(name) {
    return this.data.some(item => item.name === name);
  }

  hasChild(name) {
    return this.find(name).hasChild;
  }

  getChild(propertyName) {
    return this.find(propertyName).value;
  }

  getProperty(name) {
    return this.find(name);
  }

  getAllProerties() {
    return this.data.map(property => property.name);
  }

  getPropValue(propertyName) {
    return this.find(propertyName).value;
  }

  compareWith(config) {
    const properties = _.union(this.getAllProerties(), config.getAllProerties());
    const newData = properties.reduce((acc, name) => {
      if (this.hasProperty(name) && config.hasProperty(name)) {
        if (this.hasChild(name) && config.hasChild(name)) {
          const child = this.getChild(name).compareWith(config.getChild(name));
          const prop = this.getProperty(name);
          const newProp = createPropBasedOn(prop, {
            comparsionResult: 'noChange',
            child,
          });
          return [...acc, newProp];
        }

        if (this.getPropValue(name) === config.getPropValue(name)) {
          const prop = createPropBasedOn(this.getProperty(name), {
            comparsionResult: 'noChange',
          });
          return [...acc, prop];
        }

        const modifiedProp = createPropBasedOn(this.getProperty(name), {
          comparsionResult: 'modified',
          newValue: config.getPropValue(name),
        });
        return [...acc, modifiedProp];
      }

      if (this.hasProperty(name) && !config.hasProperty(name)) {
        const removedProp = createPropBasedOn(this.getProperty(name), {
          comparsionResult: 'removed',
        });
        return [...acc, removedProp];
      }

      const addedProp = createPropBasedOn(config.getProperty(name), {
        comparsionResult: 'added',
      });
      return [...acc, addedProp];
    }, []);
    return new ConfigAst(newData);
  }
}
