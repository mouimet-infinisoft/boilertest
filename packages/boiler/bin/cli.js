#!/usr/bin/env node

const { execSync } = require('child_process');
const { chdir } = require('process');
const { repository, name, version } = require('../package.json');

const REPO_URL = repository.url;
const VERBOSE = process.argv.join(' ').includes('--debug');

/**
 * Withconsole io
 * @param {string} cmd Execute command
 * @returns
 */
const exec = (cmd) => {
  execSync(cmd, {
    encoding: 'utf-8',
    stdio: [process.stdin, process.stdout, process.stderr],
  });
};

/**
 * Without console io
 * @param {string} cmd Execute command
 * @returns
 */
const execNoIo = (cmd) =>
  execSync(cmd, { encoding: 'utf-8', stdio: ['ignore', 'pipe', 'ignore'] });

/**
 * Test dependency template method
 * @param {string} cmd Command to execute
 * @param {RegExp} regExpCondition Command ouput condition to success
 * @param {Function} onFailure Callback function
 * @returns
 */
const execTestDependency = (
  cmd,
  regExpCondition,
  onFailure = () => [false, `Unable recover error`],
) => {
  let result;

  try {
    console.log(cmd);

    result = execNoIo(cmd);
    return [new RegExp(regExpCondition).test(result), result];
  } catch (error) {
    if (VERBOSE) {
      console.debug(error);
    }

    return onFailure();
  }
};

/**
 * Dependency check user feedback template method
 * @param {string} cmd Command to execute
 * @param {RegExp} regExpCondition Command ouput condition to success
 * @param {Function} onFailure Callback function
 * @returns
 */
const verifyDependency = (cmd, regExpCondition, onFailure) => {
  const [success, result] = execTestDependency(cmd, regExpCondition, onFailure);

  if (success) {
    console.log(` ${result.replace('\n', ' ')}
`);
  }

  if (!success) {
    console.log(
      ` ${result.replace('\n', '')} incorrect version: expecting ${String(
        regExpCondition,
      )
        .replace('/(', '')
        .replace(')/g', '')}`,
    );
  }
};

/**
 * Try to recover failure
 * @param {string} cmd Onfailure execute function
 * @returns
 */
const tryRecoverFailure = (cmd) => () => {
  if (VERBOSE) {
    console.log(`tryRecovery failure: `, cmd);
  }

  try {
    execNoIo(cmd);
    return [true, ` installed with: ${cmd}`];
  } catch (error) {
    if (VERBOSE) {
      console.debug(`tryRecovery error: `, error);
    }
    console.error(`Critical error, exiting!`);
    process.exit();
  }
};

/**
 * Verify all dependencies
 */
const verifyAllDependencies = () => {
  console.log(`
Verify dependencies...
----------------------
`);
  verifyDependency(
    `yarn -v`,
    /(1.22.*)/g,
    tryRecoverFailure(`echo npm whatever`),
  );

  verifyDependency(
    `node -v`,
    /(18.2.*)/g,
    tryRecoverFailure(`echo install node`),
  );

  verifyDependency(
    `git --version`,
    /(2.*)/g,
    tryRecoverFailure(`echo install node`),
  );

  console.log(`Verify dependencies completed!
------------------------------`);
};

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

  `);
};

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

  console.log(`
  Initializing...
  `);

  verifyAllDependencies();
};

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

const complete = () => {
  console.log(`

  Mono repo ready to use
  Powered 🚀 by Infinisoft Inc.
  Happy ☠️  Hacking

  configurations: dev/

  Visit the kitchen, ALOT is comming soon
  https://kitchen.infini-soft.com

  `);
};

welcome();
initialize();
clone(process.argv[3]);
install(process.argv[3]);
complete();
