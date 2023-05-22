import { fork } from "node:child_process";

import { WebhookClient } from "discord.js";

import { config } from "dotenv";
config({ override: true, encoding: "utf8" });

import { createRequire } from "node:module";
const main = ((createRequire(import.meta.url))("../package.json")).location;

const webhook = new WebhookClient({ url: process.env["WEBHOOK"] });

/**
 * Start new process.
 * @returns {void}
 */
function spawn() {
  const _process = fork(main);

  _process.on("error", (error) => webhook.send({ content: String(error) }));
  _process.on("exit", spawn);

  return void 0;
};

spawn();