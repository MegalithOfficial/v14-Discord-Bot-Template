import { Command } from "../../../base/export.js";

export default class extends Command {
  constructor(client) {
    super(client, {
      name: "ping",
      description: "Calculate bot ping",
      enabled: true
    });

    this.set(new this.SlashCommand());
  };

  /**
   * @param {import("discord.js").Interaction} interaction 
   * @param {import("discord.js").Guild} guild
   * @param {import("discord.js").GuildMember} member
   */
  async execute({ interaction, guild, member }) {
    const api = this.client.ws.ping;
    const bot = Math.round(Date.now() - interaction.createdTimestamp);


    const green = ":green_square:";
    const orange = ":orange_square:";
    const red = ":red_square:";
    const blue = ":blue_square:";
    const yellow = ":yellow_square:";

    let api_status = green;
    let bot_status = green;

    if (api >= 150 && api < 300) api_status = blue;
    else if (api >= 300 && api < 600) api_status = orange;
    else if (api >= 600 && api < 1200) api_status = yellow;
    else if (api >= 1200) api_status = red;

    if (bot >= 150 && bot < 300) bot_status = blue;
    else if (bot >= 300 && bot < 600) bot_status = orange;
    else if (bot >= 600 && bot < 1200) bot_status = yellow;
    else if (bot >= 1200) bot_status = red;

    const embed = new this.Embed({
      title: `${this.client.user.username} - Ping`,
      fields: [
        {
          name: `WebSocket Ping`,
          value: `${api_status} \`${api}ms\``,
          inline: true
        },
        {
          name: `API Ping`,
          value: `${bot_status} \`${bot}ms\``,
          inline: true
        }
      ],
      footer: { iconURL: member?.displayAvatarURL() },
      color: this.funt
    });

    return interaction.editReply({ embeds: [embed] });
  };
};