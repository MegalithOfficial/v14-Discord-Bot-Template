const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')
module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with the current latency.'),
  async execute (interaction) {
    const embed = new EmbedBuilder()
     .setColor("#00ff00")
     .setDescription(`API Latency: ${Math.round(interaction.client.ws.ping)}ms`)
    await interaction.reply({ embeds: [embed] })
  }
}
