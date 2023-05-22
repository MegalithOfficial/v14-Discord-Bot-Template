import API from "../API.js";

import { s } from "@sapphire/shapeshift";

import { ChannelManager } from "../Channel/ChannelManager.js";
export class MessageManager extends API {
  /**
   * @param {import("discord.js").Client} client 
   * @constructor
   */
  constructor(client) {
    super(client, API.headers);

    /**
     * @type {ChannelManager}
     * @private
     */
    this.channels = new ChannelManager(client);
  };

  /**
   * It receives the data in the ID of the specified message from the specified channel ID.
   * @param {string} channel 
   * @param {string} message
   * @returns {Promise<import("discord.js").Message | null>}
   */
  async get(channel, message) {
    s.string.parse(channel);
    s.string.parse(message);

    const channelData = await this.channels.get(channel);
    const messageData = await this.request(API.Routes.channelMessage(channelData.id, message));

    const data = await channelData?.messages.fetch(messageData.id);

    return data;
  };

  /**
   * Creates a new message in the specified channel.
   * @param {string} channel 
   * @param {import("discord.js").MessageCreateOptions} options
   * @returns {Promise<import("discord.js").Message | null>}
   */
  async create(channel, options) {
    s.string.parse(channel);

    const message = await this.request(API.Routes.channelMessages(channel), options, "POST");
    const data = await (await this.channels.get(channel))?.messages.fetch(message.id);

    return data;
  };

  /**
   * Edits the specified message in the specified channel.
   * @param {string} channel 
   * @param {string} message 
   * @param {import("discord.js").MessageEditOptions} options
   * @returns {Promise<import("discord.js").Message | null>}
   */
  async edit(channel, message, options) {
    s.string.parse(channel);
    s.string.parse(message);

    const fetched = await this.request(API.Routes.channelMessage(channel, message), options, "PATCH");
    const data = await (await this.channels.get(channel))?.messages.fetch(fetched.id);

    return data;
  };

  /**
   * Lists the messages in the specified channel.
   * @param {string} channel
   * @param {(message: import("discord.js").Message, index: number, array: (import("discord.js").Message)[]) => boolean} filter
   * @returns {(import("discord.js").Message)[]}
   */
  list(channel, filter = null) {
    s.string.parse(channel);

    /**
     * @type {Array<import("discord.js").Message>}
     */
    let messageList = [];

    const messages = this.client.channels.resolve(channel)?.messages;

    for (let index = 0; index < messages.size; index++) {
      /**
       * @type {import("discord.js").Message}
       */
      const message = messages[index];
      if (!message) break;

      messageList.push(message);
    };

    if (filter && typeof filter === "function") messageList = messageList.filter(filter);

    return messageList;
  };
}; 