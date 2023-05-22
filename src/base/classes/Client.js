import { Client as Base, IntentsBitField as Intents, Partials } from "discord.js";

import { s } from "@sapphire/shapeshift";

import Loader from "./Loader.js";
import { Database } from "./Database.js";

import { config } from "dotenv";
config({ override: true, encoding: "utf8" });

import ora from "ora";

import { BitField, enumToObject } from "@sapphire/bitfield";

export class Client extends Base {
  /**
   * @param {string} token
   * @param {import("discord.js").ClientOptions} options
   * @constructor
   */
  constructor(token = process.env["TOKEN"], options) {
    s.string.parse(token);

    super({
      intents: (new BitField(enumToObject(Intents.Flags))).mask,
      partials: Object.values(Partials).filter((partial) => typeof partial === "string"),
      ...options
    });

    /**
     * @type {string}
     * @readonly
     */
    this.token = token;

    /**
     * @type {Loader}
     * @private
     */
    this.loader = new Loader(this);

    /**
     * @private
     */
    this.db = global.db = new Database()
  };

  /**
   * @returns {Promise<void>}
   */
  async login() {

    this.loader.once("ready", async () => {
      let spinner = ora("Connecting to Gateway");

      spinner.start();

      super.login(this.token).then(async () => {
        spinner.succeed("Connected to Gateway.");

        await this.application.commands.set([]);
        await this.application.commands.set(this.loader.commands);
      });

      return void 0;
    });

    await this.loader.All();

    return void 0;
  };
};

export default Client;

new Client().login();