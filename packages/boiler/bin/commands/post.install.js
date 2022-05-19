const { chdir } = require('process');
const { exec } = require('./exec');

const VERBOSE = process.argv.join(' ').includes('--debug');
const DRYRUN = process.argv.join(' ').includes('--dry-run');

/**
 * Dependencies installtion
 * @param {string} folder
 */
const postInstall = (folder = '.') => {
  console.log(`
Post installation...
----------------------`);

  if (VERBOSE) {
    console.log(`postInstall() folder `, folder);
  }

  if (!DRYRUN) {
    exec(`rm -rf .git`);
    exec(`git --init`);
  }
}
module.exports = { postInstall };
