/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'chai';
import jsdom from 'jsdom';
import fs from 'fs';

describe('Our first test', () => {
  it('should pass', () => {
    expect(true).to.equal(true);
  })
});

describe('index.html', () => {
  it('should say users', (done) => {
    const index = fs.readFileSync('./src/client/index.html', "utf-8");
    jsdom.env(index, (err, window) => {
      const h1 = window.document.getElementsByTagName('h1')[0];
      expect(h1.innerHTML).to.equal("Users");
      window.close();
      done();
    })
  });
});