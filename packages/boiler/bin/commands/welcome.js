const { name, version } = require('../../package.json');

const VERBOSE = process.argv.join(' ').includes('--debug');
const DRYRUN = process.argv.join(' ').includes('--dry-run');

/**
 * Welcome banner
 */
const welcome = () => {
  console.log(`
Monorepo Stack - React 18, Webpack 5, Typescript, Yarn workspace, Lerna 4
Command Line Interface - ${name}@${version}
`);

  if (VERBOSE) {
    console.log(`DEBUG MODE`);
  }

  if (DRYRUN) {
    console.log(`DRY RUN`);
  }
};
module.exports = { welcome };
