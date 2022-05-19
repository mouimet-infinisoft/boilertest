#!/usr/bin/env node

const { execSync } = require('child_process');
const {repository, name, version} = require('../package.json')

const REPO_URL = repository.url
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
 * cli entry point
 */
const initialize = () => {
  console.log(`
**************************
${name} ${version}
**************************

Initializing...
`);

  verifyAllDependencies();
};

const clone = () => {
  exec(`git clone ${REPO_URL}`)
}

const install = () => {

}


initialize();
clone();
install();


