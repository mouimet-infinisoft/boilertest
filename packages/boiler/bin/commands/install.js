const { chdir } = require('process');
const { exec } = require("./exec");

const VERBOSE = process.argv.join(' ').includes('--debug');

/**
 * Dependencies installtion
 * @param {string} folder
 */
const install = (folder = '.') => {
  console.log(`
  Installing dependencies...
  ----------------------`);

  if (VERBOSE) {
    console.log(`install() folder `, folder);
  }
  chdir(folder);
  exec(`yarn`);

  console.log(`
    Installing dependencies completed!`);
};
module.exports = {install};
