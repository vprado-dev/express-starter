#!/usr/bin/env node

// dotenv
const dotenv = require("dotenv-safe");

dotenv.config();

const { Command } = require("commander");
const child_process = require("child_process");

// functions
const exec = (cmd) => child_process.execSync(cmd, { stdio: "inherit" });

// constants
const version = process.env.npm_package_version || process.env.VERSION;
const image = process.env.API_IMAGE;

// validations
if (!version) {
  throw new Error("version not set");
}
if (!image) {
  throw new Error("image not set");
}

// commander
const program = new Command();

program.name("yarn docker");
program.showHelpAfterError();
program.version(version, "-v, --version");

program.command("build").action(() => {
  exec(`docker build -t ${image}:latest .`);
  exec(`docker tag ${image}:latest ${image}:${version}`);
});

program.command("push").action(() => {
  exec(`docker push ${image}:latest`);
  exec(`docker push ${image}:${version}`);
});

program.parse(process.argv);
