/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

import chalk from 'chalk';

console.log(chalk.green('Installing client packages...'));

require('child_process')
  .spawn('yarn', [ 'install' ], { stdio: 'inherit', cwd: 'src/client', shell: true });
