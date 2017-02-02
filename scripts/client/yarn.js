/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

import chalk from 'chalk';

import { spawn } from 'child_process';

// Skip first two arguments, pass the rest
const [,, ...params] = process.argv; // eslint-disable requireSpaceAfterComma

console.log(chalk.green('Starting client yarn...'));

const yarn = spawn('yarn', params, { stdio: 'inherit', cwd: 'src/client', shell: true });
yarn.on('exit', process.exit);
