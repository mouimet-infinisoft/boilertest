/**
 * Cli usage informations
 */
const usage = () => {
  console.log(`
Usage
$ ${process.argv[1]} <commands> [arguments] [--options]

commands      arguments     description
create        <target>      - Create new monorepo top <target> folder.
                                Default folder is ./

options
--debug                     - Verbose mode
--dry-run                   - Simulate the execution without changing anything
`);
};

module.exports = {usage}
