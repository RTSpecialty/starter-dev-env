/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

import chalk from 'chalk';

// Skip first two arguments, pass the rest
const [,, ...params] = process.argv;

console.log(chalk.green('Starting client yarn...'));

require('child_process')
  .spawn('yarn', params, { stdio: 'inherit', cwd: 'src/client', shell: true });
