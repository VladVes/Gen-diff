#! /usr/bin/env node

import program from 'commander';
import genDiff from '../';

program
  .version('1.3.2')
  .description('Compare two configuration files and shows a difference')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    try {
      console.log(genDiff(firstConfig, secondConfig, program.format));
    } catch (error) {
      console.log('We have some trouble:', error);
    }
  });
program.parse(process.argv);
