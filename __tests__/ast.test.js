import Ast from '../src/Ast';

const data = {
  type: 'human',
  person: {
    name: 'John',
    age: '30',
  },
  transport: {
    vehicle: 'car',
    params: {
      fuelType: 'gasoline',
      power: 50,
    },
  },
};
const config = new Ast();

describe('AST methods', () => {
  it('should exists', () => {
    expect(config).toBeDefined();
  });

  it('should contain data', () => {
    const newConfig = config.createAst(data);
    expect(newConfig.data.length > 0).toBeTruthy;
  });

  it('should have a properties', () => {
    expect(config.hasProp('type')).toBeTruthy();
  });
});
