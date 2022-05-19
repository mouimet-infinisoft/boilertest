const { execSync } = require('child_process');

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

module.exports = {
  exec,
  execNoIo,
};
