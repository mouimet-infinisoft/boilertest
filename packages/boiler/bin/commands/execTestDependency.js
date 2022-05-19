const { execNoIo } = require("./exec");

const VERBOSE = process.argv.join(' ').includes('--debug');

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
  onFailure = () => [false, `Unable recover error`]
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

module.exports = {execTestDependency}
