const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')
const { colors } = require('../../config');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('uptime')
    .setDescription('Botun ne kadar süredir aktif olduğunu gösterir.'),
  async execute (interaction) {
    let totalSeconds = (interaction.client.uptime / 1000)
    const days = Math.floor(totalSeconds / 86400)
    totalSeconds %= 86400
    const hours = Math.floor(totalSeconds / 3600)
    totalSeconds %= 3600
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = Math.floor(totalSeconds % 60)

      const embed = new EmbedBuilder()
      .setDescription(`Bu bot, ${days} gün(ler), ${hours} saat(ler), ${minutes} dakika(lar) ve ${seconds} saniye(ler)'dir aktif.`)
      .setColor(colors.green)
     await interaction.reply({ embeds: [embed] })
  }
}
