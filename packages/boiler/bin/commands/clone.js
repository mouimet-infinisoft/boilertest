const { repository } = require('../../package.json');
const { exec } = require('./exec');

const REPO_URL = repository.template;
const VERBOSE = process.argv.join(' ').includes('--debug');
const DRYRUN = process.argv.join(' ').includes('--dry-run');

/**
 * Clone git repo
 * @param {string} folder
 */
const clone = (folder = '.') => {
  console.log(`
Cloning repo...
----------------------`);

  if (VERBOSE) {
    console.log(`clone() folder `, folder);
  }

  if (!DRYRUN) {
    exec(`git clone ${REPO_URL} ${folder}`);
  }
};
module.exports = { clone };
