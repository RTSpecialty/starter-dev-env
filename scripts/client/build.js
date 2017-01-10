/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

import chalk from 'chalk';

console.log(chalk.green('Building client app...'));

require('child_process')
  .spawn('yarn', [ 'build' ], { stdio: 'inherit', cwd: 'src/client', shell: true });
