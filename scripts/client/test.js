/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

import chalk from 'chalk';

console.log(chalk.green('Testing client app...'));

require('child_process')
  .spawn('yarn', [ 'test' ], { stdio: 'inherit', cwd: 'src/client', shell: true });
