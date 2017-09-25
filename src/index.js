import cmdr from 'commander';

export default () => {
  cmdr
    .version('1.0.0')
    .description('Compare two configuration files and shows a difference')
    .option('-f, --format [type]', 'Output format')
    .arguments('<firstConf> <secondConfig>')
    .parse(process.argv);
};
