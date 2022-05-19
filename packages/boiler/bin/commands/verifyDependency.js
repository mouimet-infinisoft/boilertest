const { execTestDependency } = require("./execTestDependency");

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
        regExpCondition
      )
        .replace('/(', '')
        .replace(')/g', '')}`
    );
  }
};

module.exports = {verifyDependency}
