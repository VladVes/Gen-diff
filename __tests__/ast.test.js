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
      isChild: false,
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

  it('should return a string representation', () => {
    const dataSetA = {
      section1: {
        a: 'valA1',
        b: 'valB2',
        subSection1: {
          c: 'valC',
        },
      },
      section2: {
        a: 'valA2',
        b: 'valA3',
      },
      prop: 'flat',
    };
    const configA = new ConfigAst().createOn(dataSetA);
    const sf = '    ';
    const ss = '        '
    const expectedA = `{\n${sf}section1: {\n${sf}${sf}a: valA1\n${sf}${sf}b: valB2\n${sf}${sf}subSection1: {\n${sf}${sf}${sf}c: valC\n${sf}${sf}}\n${sf}}\n${sf}section2: {\n${sf}${sf}a: valA2\n${sf}${sf}b: valA3\n${sf}}\n${sf}prop: flat\n}`;
    expect(configA.toString()).toBe(expectedA);
    const dataSetB1 = {
      s: {
        p1: 'v1',
        s1: {
          sp1: 'v2',
        }
      }
    };
    const dataSetB2 = {
      s: {
        p1: 'up1',
        s1: {
          sp1: 'up2',
        }
      }
    };
  const expectedB = `{\n${sf}s: {\n${sf}  + p1: up1\n${sf}  - p1: v1\n${sf}${sf}s1: {\n${sf}${sf}  + sp1: up2\n${sf}${sf}  - sp1: v2\n${sf}${sf}}\n${sf}}\n}`;
  const cfgB1 = new ConfigAst().createOn(dataSetB1);
  const resultCfgB = cfgB1.compareWith(new ConfigAst().createOn(dataSetB2));
  expect(resultCfgB.toString()).toBe(expectedB);
  });
});
