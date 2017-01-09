/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

import chalk from 'chalk';

console.log(chalk.green('Starting client app in dev mode...'));

require('child_process')
  .spawn('yarn', [ 'start' ], { stdio: 'inherit', cwd: 'src/client', shell: true });
