const { SlashCommandBuilder } = require('@discordjs/builders')
const { EmbedBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('Test Komutu.')
    .addStringOption(option =>
        option.setName('string')
        .setDescription('Birşeyler yaz!!')
        .setRequired(true)),
    
  async execute (interaction) {

    const string = interaction.options.getString("string")

      const embed = new EmbedBuilder()
      .setDescription(`Bu mesaj Çalışıyor!! \n String input: ${string}`)
      .setColor("#00ff00")
     await interaction.reply({ embeds: [embed] })
  }
}
