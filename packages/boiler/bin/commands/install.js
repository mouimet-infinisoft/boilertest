const { chdir } = require('process');
const { exec } = require('./exec');

const VERBOSE = process.argv.join(' ').includes('--debug');
const DRYRUN = process.argv.join(' ').includes('--dry-run');

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

  if (!DRYRUN) {
    chdir(folder);
    exec(`yarn`);
  }
}
module.exports = { install };
