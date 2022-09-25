const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')
const { colors } = require('../../config');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with the current latency.'),
  async execute (interaction) {
    const embed = new EmbedBuilder()
     .setColor(colors.green)
     .setDescription(`API Latency: ${Math.round(interaction.client.ws.ping)}ms`)
    await interaction.reply({ embeds: [embed] })
  }
}
