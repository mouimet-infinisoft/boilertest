const { usage } = require("./usage");
const { verifyAllDependencies } = require("./verifyAllDependencies");

const VERBOSE = process.argv.join(' ').includes('--debug');

/**
 * Initialize cli
 */
const initialize = () => {
  if (VERBOSE) {
    console.log(`initialize() argv `, process.argv);
  }

  if (process.argv.length < 3) {
    usage();
    process.exit();
  }

  verifyAllDependencies();
};
module.exports = {initialize};
