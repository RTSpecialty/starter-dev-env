/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

import webpack from 'webpack';
import chalk from 'chalk';
import config from '../webpack.config.prod';

process.env.NODE_ENV = 'production';

console.log(chalk.blue("Generating minified bundle for production. This will take a moment..."));

webpack(config).run((err, stats) => {
  if (err) {
    console.log(chalk.red(err));
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.errors.length) {
    jsonStats.errors.map(error => console.log(chalk.red(error)));
    return 1;
  }

  jsonStats.warnings.map(warning => console.log(chalk.yellow(warning)));

  console.log(`Webpack stats: ${stats}`);
  console.log(chalk.green('Your app has been built for production and written to /dist'));

  return 0;
});
