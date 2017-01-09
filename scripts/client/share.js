/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

import chalk from 'chalk';

console.log(chalk.green('Sharing client app in dev mode...'));

require('child_process')
  .spawn('yarn', [ 'share' ], { stdio: 'inherit', cwd: 'src/client', shell: true });
