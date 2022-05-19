#!/usr/bin/env node
const { clone } = require("./commands/clone");
const { complete } = require("./commands/complete");
const { install } = require("./commands/install");
const { initialize } = require("./commands/initialize");
const { welcome } = require("./commands/welcome");

welcome();
initialize();
clone(process.argv[3]);
install(process.argv[3]);
complete();
