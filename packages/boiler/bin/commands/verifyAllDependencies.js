const { verifyDependency } = require('./verifyDependency');
const { tryRecoverFailure } = require('./tryRecoverFailure');

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

module.exports = { verifyAllDependencies };
