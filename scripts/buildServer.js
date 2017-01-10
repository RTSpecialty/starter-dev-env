/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

import express from 'express';
import path from 'path';
import open from 'open';
import chalk from 'chalk';
import compression from 'compression';

const port = 3000;
const app = express();
const url = `http://localhost:${port}`;

app.use(compression());
app.use(express.static('src/client/build'));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/client/build/index.html'));
});

app.listen(port, err => {
  if (err) {
    console.log(chalk.red(err));
  } else {
    open(url);
    console.log(chalk.green(`Build Server running on: ${url}`));
  }
});
