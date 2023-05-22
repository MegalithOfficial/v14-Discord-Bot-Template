import API from "../API.js";

import { s } from "@sapphire/shapeshift";

import { getVoiceConnection, joinVoiceChannel } from "@discordjs/voice";

export class VoiceManager extends API {
  /**
   * @param {import("discord.js").Client} client 
   * @constructor
   */
  constructor(client) {
    super(client, API.headers);

    /**
     * @type {import("@discordjs/voice").JoinVoiceChannelOptions}
     * @private
     */
    this.options = {
      selfDeaf: true
    };
  };

  /**
   * Set connection options.
   * @param {import("@discordjs/voice").JoinVoiceChannelOptions} options
   * @returns {void}
   */
  setOptions(options) {
    this.options = options;

    return void 0;
  };

  /**
   * Create new voice connections.
   * @param  {...string} channels
   * @returns {number}
   */
  create(...channels) {
    const options = this.options;

    let totalConnected = 0;

    const triedGuilds = [];
    for (let index = 0; index < channels.length; index++) {
      /**
       * @type {import("discord.js").GuildChannel}
       */
      const channel = this.client.channels.resolve(channels[index]);
      if (!channel) break;

      const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
        ...options
      });

      connection.on("error", () => connection.rejoin(connection.joinConfig));

      triedGuilds.push(channel.guild.id);
    };

    const guilds = this.get(...(triedGuilds));
    for (let index = 0; index < guilds.length; index++) {
      const connection = guilds[index];

      if (connection.state) totalConnected++;
    };

    return totalConnected;
  };

  /**
   * It checks if the bot is on the voice channel on the servers you specified.
   * @param  {...string} guilds
   * @returns {{ guild: string, state: boolean }[]}
   */
  get(...guilds) {
    s.string.array.parse(guilds);

    /**
     * @type {{ guild: string, state: boolean }[]}
     */
    const connections = [];

    for (let index = 0; index < guilds.length; index++) {
      /**
       * @type {import("discord.js").Guild}
       */
      const guild = guilds[index];

      if (getVoiceConnection(guild)) connections.push({ guild, state: true });
      else connections.push({ guild, state: false });
    };

    return connections;
  };
}; 