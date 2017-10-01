#! /usr/bin/env node

import program from 'commander';
import genDiff from '../';
import * as app from '../../package.json'

program
  .version(app.version)
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
