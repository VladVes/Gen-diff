import { compare, prepareData } from '../src/';
import getRenderer from '../src/renderers';

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
    const sf = '    ';
    const ss = '        '
    const expectedA = `{\n${sf}section1: {\n${sf}${sf}a: valA1\n${sf}${sf}b: valB2\n${sf}${sf}subSection1: {\n${sf}${sf}${sf}c: valC\n${sf}${sf}}\n${sf}}\n${sf}section2: {\n${sf}${sf}a: valA2\n${sf}${sf}b: valA3\n${sf}}\n${sf}prop: flat\n}`;
    const preparedData = prepareData(dataSetA);
    expect(getRenderer('standart')(compare(preparedData, preparedData))).toBe(expectedA);
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
    const preparedDataB1 = prepareData(dataSetB1);
    const preparedDataB2 = prepareData(dataSetB2);
    expect(getRenderer('standart')(compare(preparedDataB1, preparedDataB2))).toBe(expectedB);
  });
});
