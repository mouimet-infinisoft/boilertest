#!/usr/bin/env node

const { resolve } = require('path');
const { clone } = require('./commands/clone');
const { complete } = require('./commands/complete');
const { install } = require('./commands/install');
const { initialize } = require('./commands/initialize');
const { welcome } = require('./commands/welcome');
const { postInstall } = require('./commands/post.install');

const targetDir = resolve(process.argv[3]);

welcome();
initialize();
clone(targetDir);
install(targetDir);
postInstall(targetDir);
complete();
