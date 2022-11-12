const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { bot, colors } = require('../../config');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('eval')
    .setDescription('Kod çalıştırır.')
    .addStringOption(option => 
      option.setName('code')
       .setDescription('Kod')
       .setRequired(true)),
    async execute (interaction) {
      
    if(interaction.user.id !== bot.ownerId) return interaction.reply({ content: 'Hey! bu komutu sadece bot sahibi kullanabilir', ephemeral: true });
    try {

      let code = interaction.options.getString('code')
      let evaled = eval(code)
      let tip = typeof(evaled)
    
      evaled = require('util').inspect(evaled)
    
      interaction.reply({
        ephemeral: true,
        embeds: [
          new EmbedBuilder()
          .setColor(colors.green)
          .addFields( 
            {name: 'GİRİŞ', value:  `\`\`\`js\n${code}\`\`\``},
            {name: 'ÇIKTI', value:  `\`\`\`js\n${evaled.length > 1000 ? `${evaled.slice(0, 1000)}...` : `${clean(evaled)}` }\`\`\``},
            {name: 'Uzunluk', value:  `\`${evaled.length}\``, inline: true},
            {name: 'Çalışma pingi', value:  `\`0.0${interaction.client.ws.ping} MS\``, inline: true},
          )
        ]
      });
  
    } catch (err) {
  
      interaction.reply({
        ephemeral: true,
        embeds: [
          new EmbedBuilder()
          .setColor(colors.red)
          .addFields( 
            {name: 'HATA', value:  `\`\`\`js\n${clean(err).length > 1000 ? `${clean(err).slice(0, 1000)}...` : `${clean(err)}`}\n\`\`\``},
          )        
        ],
      });
    };
  
    function clean(text) {
  
      if (typeof(text) == 'string') return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203))
      else
      return text
    };
  }
}
