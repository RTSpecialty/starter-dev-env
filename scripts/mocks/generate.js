/* This script generates mock data for local development.
   This way you don't have to point to an actual API,
   but you can enjoy realistic, but randomized, data
   and rapid page loads due to local static data.
*/

/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

import jsf from 'json-schema-faker';
import fs from 'fs';
import chalk from 'chalk';
import schema from './schema';

const json = JSON.stringify(jsf(schema));

fs.writeFile('./src/server/mocks/db.json', json, (err) => {
  if (err) {
    return console.log(chalk.red(err));
  } else {
    console.log(chalk.green("Mock data generated."));
  }
});
