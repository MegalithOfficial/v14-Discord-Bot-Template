import API from "../API.js";

import { s } from "@sapphire/shapeshift";

import ora from "ora";

import InviteCache from "./Invite.js";
export class InviteManager extends API {
  /**
   * @param {Client} client 
   * @constructor
   */
  constructor(client) {
    super(client, API.headers);
  };

  /**
   * @returns {import("discord.js").Collection<string, import("discord.js").Invite>}
   */
  get cache() {
    return InviteCache;
  };

  /**
   * It saves invites in the cache.
   * @param {boolean} debug 
   * @returns {void}
   */
  handle(debug = false) {
    s.boolean.parse(debug);

    const spinner = ora("[InviteManager] Initiating caching");

    if (debug) spinner.start();

    const guilds = this.client.guilds.cache;

    let errorCount = 0;
    for (let index = 0; index < guilds.size; index++) {
      /**
       * @type {import("discord.js").Guild}
       */
      const guild = guilds[index];
      const invites = guild.invites.cache;

      for (let i = 0; i < invites.size; i++) {
        /**
         * @type {import("discord.js").Invite}
         */
        const invite = invites[i];

        try {
          const { code } = invite;
          if (!code) break;

          if (debug) spinner.text = `[InviteManager] ${code} (${invite.guild.name}) was handled and cached.`;

          this.cache.set(code, invite);
        } catch (err) {
          errorCount++;
        };
      };
    };

    spinner[errorCount > 0 ? "warn" : "succeed"](`[InviteManager] Caching ${errorCount > 0 ? `completed with some errors. (${errorCount} errors found.)` : `completed!`}`);

    return void 0;
  };

  /**
   * Retrieves the information of the specified invitation code.
   * @param {string} code
   * @returns {Promise<import("discord.js").Invite>}
   */
  async get(code) {
    s.string.parse(code);

    const invite = await this.request(API.Routes.invite(code));
    const data = this.client.guilds.resolve(invite.guild.id).invites.resolve(invite.code);

    return data;
  };

  /**
   * Creates a new invitation on the channel with the specified ID.
   * @param {string} channel 
   * @param {import("discord.js").InviteCreateOptions} options 
   * @returns {Promise<import("discord.js").Invite>}
   */
  async create(channel, options) {
    s.string.parse(channel);

    const data = await this.request(API.Routes.channelInvites(channel), options, "POST");
    const invite = this.client.guilds.resolve(this.client.channels.resolve(channel).guild.id).invites.resolve(data.code);

    return invite;
  };

  /**
   * Deletes a Discord Guild Invite.
   * @param {string} code
   * @returns {Promise<import("discord.js").Invite>}
   */
  async delete(code) {
    s.string.parse(code);

    const invite = await this.request(API.Routes.invite(code));
    const data = await this.client.fetchInvite(invite.code);

    await this.request(API.Routes.invite(invite.code));

    return data;
  };

  /**
   * Receives all invitations from the server whose ID is specified.
   * @param {string} guild
   * @param {(invite: import("discord.js").Invite, index: number, array: (import("discord.js").Invite)[]) => boolean} filter
   * @returns {Promise<import("discord.js").Invite[]>}
   */
  list(guild, filter = null) {
    s.string.parse(guild);

    /**
     * @type {Array<import("discord.js").Invite>}
     */
    let inviteList = [];

    const guildData = this.client.guilds.resolve(guild);
    const invites = guildData.invites.cache;

    for (let index = 0; index < invites.size; index++) {
      /**
       * @type {import("discord.js").Invite}
       */
      const invite = invites[index];

      inviteList.push(invite);
    };

    if (filter && typeof filter === "function") inviteList = inviteList.filter(filter);

    return inviteList;
  };
};