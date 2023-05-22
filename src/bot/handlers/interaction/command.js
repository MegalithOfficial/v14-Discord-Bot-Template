import { Handler } from "../../../base/export.js";

export default class extends Handler {
  constructor(client) {
    super(client, {
      name: Handler.Events.InteractionCreate,
      enabled: true,
      type: "ChatCommand"
    });
  };

  /**
   * @param {import("discord.js").ChatInputCommandInteraction} interaction 
   * @returns {Promise<void>}
   */
  async execute(interaction) {

    if(!this.client.isReady()) return;
    if(!interaction.isChatInputCommand()) return

    //await interaction.deferReply()

    const command = this.commands.get(interaction.command.name);

    if (!this.commands.has(command?.name)) return;

    const client = this.client;
    const member = interaction.member;
    const user = interaction.user;
    const channel = interaction.channel;
    const guild = interaction.guild;

    if (this.cooldowns.has(`${member.id}.${command.name}`)) {
      const cooldown = this.cooldowns.get(`${member.id}.${command.name}`);
      const date = new Date();

      const remaining = (new Date(cooldown - date).getTime() / 1000).toFixed();

      return interaction.reply({ content: `Wait '${remaining} Seconds' to use this command again.` });
    };

    await command.execute({ member, user, channel, interaction, guild }).then(() => {
      if (this.isOwner(member.id)) return;

      const date = new Date();
      date.setSeconds(date.getSeconds() + command.cooldown);

      this.cooldowns.set(`${member.id}.${command.name}`, date);

      setTimeout(() => this.cooldowns.delete(`${member.id}.${command.name}`), (command.cooldown * 1000));
    });

    return void 0;
  };
};