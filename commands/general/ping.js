const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')
const { colors } = require('../../config');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Bot pingi gösterir.'),
  async execute (interaction) {
    const embed = new EmbedBuilder()
     .setColor(colors.green)
     .setDescription(`API Latency: ${Math.round(interaction.client.ws.ping)}ms`)
    await interaction.reply({ embeds: [embed] })
  }
}
