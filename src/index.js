import cli from 'commander';
import compare from './lib/';

export const run = () => {
  cli
    .version('1.0.0')
    .description('Compare two configuration files and shows a difference')
    .option('-f, --format [type]', 'Output format')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => {
      const result = compare.json(firstConfig, secondConfig);
      console.log(result);
      //firstConfigValue = firstConfig;
      //secondConfigValue = secondConfig;
    });
    cli.parse(process.argv);

};
