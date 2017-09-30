import ConfigAst from '../src/ConfigAst';

const dataSet1 = {
  type: 'human',
  person: {
    name: 'John',
    age: '30',
    id: 'passport',
  },
  transport: {
    vehicle: 'car',
    params: {
      fuelType: 'gasoline',
      power: 150,
    },
  },
  activity: 'no move',
};

const dataSet2 = {
  type: 'human',
  person: {
    name: 'John',
    age: '20',
    biometrics: {
      sex: 'man',
      height: '180',
      weight: '100',
      eyes: 'black',
    },
  },
  objective: 'unknown',
  transport: {
    vehicle: 'car',
  },
};

const config = new ConfigAst();

describe('AST work', () => {
  it('should exists', () => {
    expect(config).toBeDefined();
  });

  const firstConfig = config.createOn(dataSet1);
  it('should contain data', () => {
    expect(firstConfig.data.length > 0).toBeTruthy;
  });

  it('should have a properties', () => {
    expect(firstConfig.hasProperty('type')).toBeTruthy();
    expect(firstConfig.hasProperty('transport')).toBeTruthy();
  });

  it('should have not sub properties', () => {
    expect(firstConfig.hasProperty('age')).toBeFalsy();
    expect(firstConfig.hasProperty('fuelType')).toBeFalsy();
  });

  it('should have a child', () => {
    expect(firstConfig.hasChild('transport')).toBeTruthy();
    expect(firstConfig.hasChild('person')).toBeTruthy();
  });

  it('should be equal ', () => {
    const expected = {
      name: 'name',
      comparsionResult: 'noChange',
      hasChild: false,
      value: 'John',
      newValue: null,
    };

    expect(firstConfig.getChild('person').getProperty('name')).toEqual(expected);
  });

  const newConfig = firstConfig.compareWith(new ConfigAst().createOn(dataSet2));
  it('should return result of comparsion', () => {
    expect(newConfig).toBeDefined();
    expect(newConfig.hasProperty('type')).toBeTruthy();
  });

  it('should be identical', () => {
    expect(newConfig.getProperty('type').comparsionResult).toBe('noChange');
  });

  it('should be modified', () => {
    const modifiedProp = newConfig.getChild('person').getProperty('age');
    expect(modifiedProp.comparsionResult).toBe('modified');
    expect(modifiedProp.value).toBe('30');
    expect(modifiedProp.newValue).toBe('20');
  });

  it('should be removed', () => {
    expect(newConfig.getProperty('activity').comparsionResult).toBe('removed');
  });

  it('should be added', () => {
    expect(newConfig.getProperty('objective').comparsionResult).toBe('added');
  });
});
