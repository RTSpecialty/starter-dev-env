//This file isn't transpiled, so must use CommonJS and ES5
/* eslint-disable import/no-extraneous-dependencies */

//Register babel to transpile before our tests run
require('babel-register')();

//Disable webpack features that Mocha doesn't understand
require.extensions['.css'] = function() {};
