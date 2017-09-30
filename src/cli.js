import cli from 'commander';
import genDiff from './';

export default () => {
  cli
    .version('1.3.0')
    .description('Compare two configuration files and shows a difference')
    .option('-f, --format [type]', 'output format')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => {
      try {
        console.log(genDiff(firstConfig, secondConfig, cli.format));
      } catch (error) {
        console.log('We have some trouble:', error);
      }
    });
  cli.parse(process.argv);
};
