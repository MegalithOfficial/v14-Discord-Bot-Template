import API from "../API.js";

import { s } from "@sapphire/shapeshift";

import ora from "ora";

import GuildCache from "./Guild.js";
export class GuildManager extends API {
  /**
   * @param {Client} client 
   * @constructor
   */
  constructor(client) {
    super(client, API.headers);
  };

  /**
   * @returns {import("discord.js").Collection<string, import("discord.js").Guild>}
   */
  get cache() {
    return GuildCache;
  };

  /**
   * It saves guilds in the cache.
   * @param {boolean} debug 
   * @returns {void}
   */
  handle(debug = false) {
    s.boolean.parse(debug);

    const spinner = ora("[GuildManager] Initiating caching");

    if (debug) spinner.start();

    const guilds = this.client.guilds.cache;

    let errorCount = 0;
    for (let index = 0; index < guilds.size; index++) {
      /**
       * @type {import("discord.js").Guild}
       */
      const guild = guilds[index];

      try {
        const { name, id } = guild;
        if (!name || !id) break;

        if (debug) spinner.text = `[GuildManager] ${name} (${id}) was handled and cached.`;

        this.cache.set(id, guild);
      } catch (err) {
        errorCount++;
      };
    };

    spinner[errorCount > 0 ? "warn" : "succeed"](`[GuildManager] Caching ${errorCount > 0 ? `completed with some errors. (${errorCount} errors found.)` : `completed!`}`);

    return void 0;
  };

  /**
   * Discards the data of the specified server.
   * @param {string} guild
   * @returns {Promise<import("discord.js").Guild>}
   */
  async get(guild) {
    s.string.parse(guild);

    const fetched = await this.request(API.Routes.guild(guild));
    const server = this.client.guilds.resolve(fetched.id);

    return server;
  };

  /**
   * Deletes the server with the specified ID.
   * @param {string} guild 
   * @returns {Promise<import("discord.js").Guild>} 
   */
  async leave(guild) {
    s.string.parse(guild);

    const server = await this.get(guild);

    await server.leave();

    return server;
  };

  /**
   * Creates a new Discord Guild.
   * @param {import("discord.js").GuildCreateOptions} options
   * @returns {Promise<import("discord.js").Guild>}
   */
  async create(options) {
    const data = await this.request(API.Routes.guilds(), options, "POST");

    const guild = this.client.guilds.resolve(data.id);

    return guild;
  };

  /**
   * Edits a Discord Guild.
   * @param {string} guild 
   * @param {import("discord.js").GuildEditOptions} options 
   * @returns {Promise<import("discord.js").Guild>}
   */
  async edit(guild, options) {
    s.string.parse(guild);

    const data = await this.request(API.Routes.guild(guild), options, "PATCH");

    const server = this.client.guilds.resolve(data.id);

    return server;
  };

  /**
   * Get all the guilds of the bot.
   * @param {(guild: import("discord.js").Guild, index: number, array: (import("discord.js").Guild)[]) => boolean} filter
   * @returns {import("discord.js").Guild[]}
   */
  list(filter = null) {
    /**
     * @type {Array<import("discord.js").Guild>}
     */
    let guildList = [];

    const guilds = this.client.guilds.cache;
    for (let index = 0; index < guilds.size; index++) {
      /**
       * @type {import("discord.js").Guild}
       */
      const guild = guilds[index];
      if (!guild) break;

      guildList.push(guild);
    };

    if (filter && typeof filter === "function") guildList = guildList.filter(filter);

    return guildList;
  };
};