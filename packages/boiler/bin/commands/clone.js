const { repository } = require('../../package.json');
const { exec } = require('./exec');

const REPO_URL = repository.template;
const VERBOSE = process.argv.join(' ').includes('--debug');

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
  exec(`git clone ${REPO_URL} ${folder}`);

  console.log(`
Cloning completed!
----------------------`);
};
module.exports = { clone };
