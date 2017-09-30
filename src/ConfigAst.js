import _ from 'lodash';

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
        item.isChild = true;
        item.value = this.createOn(data[key]);
        return [...acc, item];
      }

      item.isChild = false;
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
    return this.find(name).isChild;
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

  createPropBasedOn(prop, updates = {}) {
    const { comparsionResult, newValue, child } = updates;
    return {
      name: prop.name,
      comparsionResult: comparsionResult || prop.comparsionResult,
      isChild: prop.isChild,
      value: child || prop.value,
      newValue: newValue || prop.newValue,
    };
  }

  compareWith(config) {
    const properties = _.union(this.getAllProerties(), config.getAllProerties());
    const newData = properties.reduce((acc, name) => {
      if(this.hasProperty(name) && config.hasProperty(name)) {
        if (this.hasChild(name) && config.hasChild(name)) {
          const child = this.getChild(name).compareWith(config.getChild(name));
          const prop = this.getProperty(name);
          const newProp = this.createPropBasedOn(prop, {
            comparsionResult: 'noChange',
            child,
          });
          return [...acc, newProp];
        }

        if (this.getPropValue(name) === config.getPropValue(name)) {
          const prop = this.createPropBasedOn(this.getProperty(name), {
            comparsionResult: 'noChange',
          });
          return [...acc, prop];
        }

        const modifiedProp = this.createPropBasedOn(this.getProperty(name), {
          comparsionResult: 'modified',
          newValue: config.getPropValue(name),
        });
        return [...acc, modifiedProp];
      }

      if (this.hasProperty(name) && !config.hasProperty(name)) {
        const removedProp = this.createPropBasedOn(this.getProperty(name), {
          comparsionResult: 'removed',
        });
        return [...acc, removedProp];
      }

      if (!this.hasProperty(name) && config.hasProperty(name)) {
        const addedProp = this.createPropBasedOn(config.getProperty(name), {
          comparsionResult: 'added',
        });
        return [...acc, addedProp];
      }

    }, []);
    return new ConfigAst(newData);
  }

  toString(idention = '') {
    const properties = this.getAllProerties();
    const cmpResultMap = {
      modified: {
        forNewVal: '+ ',
        forPrevVal: '- ',
      },
      removed: '- ',
      added: '+ ',
      noChange: '  ',
    };
    const result = properties.map(name => {
      const property = this.getProperty(name);
      const sign = cmpResultMap[property.comparsionResult];
      if (property.isChild) {
        return `\n${idention}  ${sign}${name}: ` + this.getChild(name).toString(idention + '    ');
      }

      if (property.comparsionResult === 'modified') {
        const firstStr = `\n${idention}  ${sign.forNewVal}${name}: ${property.newValue}`;
        const secondStr = `\n${idention}  ${sign.forPrevVal}${name}: ${property.value}`;
        return firstStr + secondStr;
      }

      return `\n${idention}  ${sign}${name}: ${property.value}`;
    }).join('');

    return `{${result}\n${idention}}`;
  }

}
