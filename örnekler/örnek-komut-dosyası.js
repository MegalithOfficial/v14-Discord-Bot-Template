

const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('komut adlı') // UYARI: komut açıklamasında boşluk, özel karakterler (! , = ? . parantez ve türleri vb.) ve Büyük harf bulunduramaz!
    .setDescription('komut açıklaması'),
    /*
      Option türleri: https://discordjs.guide/slash-commands/advanced-creation.html#option-types
      Optionlarda Choices: https://discordjs.guide/slash-commands/advanced-creation.html#choices
      SubCommandlar: https://discordjs.guide/slash-commands/advanced-creation.html#subcommands

      Tüm optionlar: 
      .addStringOption(option => option.setName('input').setDescription('Enter a string'))
	  .addIntegerOption(option => option.setName('int').setDescription('Enter an integer'))
	  .addBooleanOption(option => option.setName('choice').setDescription('Select a boolean'))
	  .addUserOption(option => option.setName('target').setDescription('Select a user'))
	  .addChannelOption(option => option.setName('destination').setDescription('Select a channel'))
	  .addRoleOption(option => option.setName('muted').setDescription('Select a role'))
	  .addMentionableOption(option => option.setName('mentionable').setDescription('Mention something'))
	  .addNumberOption(option => option.setName('num').setDescription('Enter a number'))
	  .addAttachmentOption(option => option.setName('attachment').setDescription('Attach something'));

    */

  async execute (interaction) {

    /*
    Optionlardan veri alma: 
     const string = interaction.options.getString('input');
     const integer = interaction.options.getInteger('int');
     const boolean = interaction.options.getBoolean('choice');
     const user = interaction.options.getUser('target');
     const member = interaction.options.getMember('target');
     const channel = interaction.options.getChannel('destination');
     const role = interaction.options.getRole('muted');
     const mentionable = interaction.options.getMentionable('mentionable');
     const number = interaction.options.getNumber('num');
     const attachment = interaction.options.getAttachment('attachment');
    */
   
    // kodlar..

  }
}

