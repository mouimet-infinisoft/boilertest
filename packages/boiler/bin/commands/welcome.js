const { name, version } = require('../../package.json');

/**
 * Welcome banner
 */
const welcome = () => {
  console.log(`
  **************************
  Monorepo boilerplate
  Command Line Interface
  ${name} ${version}
  **************************
  Totaly open configuration without eject
  React 18, Webpack 5, Typescript, Lerna 4`);
};
module.exports = {welcome};
