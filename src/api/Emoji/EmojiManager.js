import API from "../API.js";

import { s } from "@sapphire/shapeshift";

import ora from "ora";

import EmojiCache from "./Emoji.js";
export class EmojiManager extends API {
  /**
   * @param {import("discord.js").Client} client 
   * @constructor
   */
  constructor(client) {
    super(client, API.headers);
  };

  /**
   * @returns {import("discord.js").Collection<string, import("discord.js").GuildEmoji>}
   */
  get cache() {
    return EmojiCache;
  };

  /**
   * It saves emojis in the cache.
   * @param {boolean} debug 
   * @returns {void}
   */
  handle(debug = false) {
    s.boolean.parse(debug);

    const spinner = ora("[EmojiManager] Initiating caching");

    if (debug) spinner.start();

    const emojis = this.client.emojis.cache;

    let errorCount = 0;
    for (let index = 0; index < emojis.size; index++) {
      /**
       * @type {import("discord.js").GuildEmoji}
       */
      const emoji = emojis[index];

      try {
        const { name, id } = emoji;
        if (!name || !id) break;

        if (debug) spinner.text = `[EmojiManager] ${name} (${id}) was handled and cached.`;

        this.cache.set(id, emoji);
      } catch (err) {
        errorCount++;
      };
    };

    spinner[errorCount > 0 ? "warn" : "succeed"](`[EmojiManager] Caching ${errorCount > 0 ? `completed with some errors. (${errorCount} errors found.)` : `completed!`}`);

    return void 0;
  };

  /**
   * Get the information of the specified emoji from the specified server.
   * @param {import("discord.js").Guild} guild
   * @param {string} emoji 
   * @returns {Promise<import("discord.js").GuildEmoji>}
   */
  async get(guild, emoji) {
    const { id } = guild;
    if (!id) throw new Error("InvalidGuild", `This guild id is not found in the object. (${id})`);

    s.string.parse(emoji);

    const data = await this.request(API.Routes.guildEmoji(id, emoji));
    const fetchedData = this.client.emojis.resolve(data.id);

    return fetchedData;
  };

  /**
   * Creates a new Discord Guild Emoji.
   * @param {import("discord.js").Guild} guild 
   * @param {import("discord.js").GuildEmojiCreateOptions} options
   * @returns {Promise<import("discord.js").GuildEmoji>}
   */
  async create(guild, options) {
    const { id } = guild;
    if (!id) throw new Error("InvalidGuild", `This guild id is not found in the object. (${id})`);

    const data = await this.request(API.Routes.guildEmojis(id), options, "POST");
    const emoji = this.client.emojis.resolve(data.id);

    this.cache.set(emoji.id, emoji);

    return emoji;
  };

  /**
   * Edits a Discord Guild Emoji.
   * @param {import("discord.js").Guild} guild 
   * @param {import("discord.js").GuildEmojiEditOptions} options
   * @returns {Promise<import("discord.js").GuildEmoji>}
   */
  async edit(guild, options) {
    const { id } = guild;
    if (!id) throw new Error("InvalidGuild", `This guild id is not found in the object. (${id})`);

    const data = await this.request(API.Routes.guildEmoji(id), options, "PATCH");
    const emoji = this.client.emojis.resolve(data.id);

    this.cache.set(emoji.id, emoji);

    return emoji;
  };

  /**
   * Deletes a Discord Guild Emoji.
   * @param {string} emoji 
   * @returns {Promise<void>}
   */
  async delete(emoji) {
    s.string.parse(emoji);

    const emojiData = (this.list((e) => e.id === emoji)[0]);
    await this.request(API.Routes.guildEmoji(emojiData.guild.id, emojiData.id), null, "DELETE");

    return void 0;
  };

  /**
   * Find emoji from all servers.
   * @param {(emoji: import("discord.js").GuildEmoji, index: number, array: (import("discord.js").GuildEmoji)[]) => boolean} filter
   * @returns {import("discord.js").GuildEmoji[]}
   */
  list(filter = null) {
    /**
     * @type {Array<import("discord.js").GuildEmoji>}
     */
    let emojiList = [];

    const emojis = this.client.emojis.cache;
    for (let index = 0; index < emojis.size; index++) {
      /**
       * @type {import("discord.js").GuildEmoji}
       */
      const emoji = emojis[index];
      if (!emoji) break;

      emojiList.push(emoji);
    };

    if (filter && typeof filter === "function") emojiList = emojiList.filter(filter);

    return emojiList;
  };
};