import ConfigAst from '../src/ConfigAst';
import { getRenderer } from '../src/genDiffLib';

describe('Renderes should return string representation', () => {
  it('shold work with default renderer', () => {
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
    const rendererA = getRenderer(configA, 'default');
    expect(rendererA.execute()).toBe(expectedA);
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
  const rendererB = getRenderer(resultCfgB, 'default');
  expect(rendererB.execute()).toBe(expectedB);
  });
});
