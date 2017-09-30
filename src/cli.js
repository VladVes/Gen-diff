import cli from 'commander';
import genDiff from './';

export default () => {
  cli
    .version('1.2.1')
    .description('Compare two configuration files and shows a difference')
    .option('-f, --format [type]', 'output format')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => {
      try {
        const result = genDiff(firstConfig, secondConfig);
        console.log(result);
      } catch (error) {
        console.log('We have some trouble:', error);
      }
    });
  cli.parse(process.argv);
};
