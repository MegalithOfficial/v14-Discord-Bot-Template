import API from "../API.js";

import { s } from "@sapphire/shapeshift";

import ora from "ora";

import ChannelCache from "./Channel.js";
export class ChannelManager extends API {
  /**
   * @param {import("discord.js").Client} client 
   * @constructor
   */
  constructor(client) {
    super(client, API.headers);
  };

  /**
   * @returns {import("discord.js").Collection<string, import("discord.js").GuildChannel>}
   */
  get cache() {
    return ChannelCache;
  };

  /**
   * It saves channels in the cache.
   * @param {boolean} debug 
   * @returns {void}
   */
  handle(debug = false) {
    s.boolean.parse(debug);

    const spinner = ora("[ChannelManager] Initiating caching");

    if (debug) spinner.start();

    const channels = this.client.channels.cache;

    let errorCount = 0;
    for (let index = 0; index < channels.size; index++) {
      /**
       * @type {import("discord.js").GuildChannel}
       */
      const channel = channels[index];

      try {
        const { name, id } = channel;

        if (debug) spinner.text = `[ChannelManager] ${name} (${id}) was handled and cached.`;

        this.cache.set(id, channel);
      } catch (err) {
        errorCount++;
      };
    };

    spinner[errorCount > 0 ? "warn" : "succeed"](`[ChannelManager] Caching ${errorCount > 0 ? `completed with some errors. (${errorCount} errors found.)` : `completed!`}`);

    return void 0;
  };

  /**
   * Get the channel whose ID you specified.
   * @param {string} channel
   * @returns {Promise<import("discord.js").GuildChannel>}
   */
  async get(channel) {
    s.string.parse(channel);

    const fetched = await this.request(API.Routes.channel(channel));
    const result = this.client.channels.resolve(fetched.id);

    return result;
  };

  /**
   * Creates a new Discord Guild Channel.
   * @param {string} guild 
   * @param {import("discord.js").GuildChannelCreateOptions} options
   * @returns {Promise<import("discord.js").GuildChannel>}
   */
  async create(guild, options) {
    s.string.parse(guild);

    const data = await this.request(API.Routes.guildChannels(guild), options, "POST");
    const channel = this.client.channels.resolve(data.id);

    return channel;
  };

  /**
   * Deletes a Discord Guild Channel.
   * @param {import("discord.js").GuildChannel} channel
   * @returns {Promise<void>}
   */
  async delete(channel) {
    const { id } = channel;
    if (!id) throw new Error("InvalidChannel", `This channel id is not found in the object. (${id})`);

    await this.request(API.Routes.channel(id));

    return void 0;
  };

  /**
   * Edits a Discord Guild Channel. 
   * @param {import("discord.js").GuildChannel} channel
   * @param {import("discord.js").GuildChannelEditOptions} options
   * @returns {Promise<import("discord.js").GuildChannel>}
   */
  async edit(channel, options) {
    const { id } = channel;
    if (!id) throw new Error("InvalidChannel", `This channel id is not found in the object. (${id})`);

    const data = await this.request(API.Routes.channel(id), options, "PATCH");
    const newChannelData = this.client.channels.resolve(data.id);

    return newChannelData;
  };

  /**
   * Get all the channels of the bot.
   * @param {(channel: import("discord.js").GuildChannel, index: number, array: (import("discord.js").GuildChannel)[]) => boolean} filter
   * @returns {import("discord.js").GuildChannel[]}
   */
  list(filter = null) {
    /**
     * @type {Array<import("discord.js").GuildChannel>}
     */
    let channelList = [];

    const channels = this.client.channels.cache;
    for (let index = 0; index < channels.size; index++) {
      /**
       * @type {import("discord.js").GuildChannel}
       */
      const channel = channels[index];
      if (!channel) break;

      channelList.push(channel);
    };

    if (filter && typeof filter === "function") channelList = channelList.filter(filter);

    return channelList;
  };
};