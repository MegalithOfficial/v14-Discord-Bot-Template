const { Events } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);
      if (!command) return;

      try {
        command.execute(interaction);
      } catch (error) {
        console.error(error);
        return interaction.reply({
          content: `Komut çalıştırılırken bir hata çıktı! \n\n\`\`\`${error}\`\`\``,
          ephemeral: true,
        });
      }

      console.log(
        `${interaction.user.tag} adlı kullanıcı /${interaction.commandName} komutunu kullandı. Kanal: #${interaction.channel.name} Sunucu: ${interaction.guild.name}`
      );
    } else if (interaction.isButton()) {
      // Buttona tıklanınca olucak işlem kodlarını buraya koyun.
      /*
       Örnek:
        if(interaction.customId === "test") {
          return interaction.reply({ content: `Hey <@${interaction.user.id}>, Buttona bastın!` });
        }
      */
    } else if (interaction.isSelectMenu()) {
      // SelectMenu den birşey seçilince olucak işlem kodlarını buraya koyun.
      /*
       Örnek:
        if(interaction.customId === "test") {
          const secilen = interaction.values[0];
          return interaction.reply({ content: `Hey <@${interaction.user.id}>, Seçtiğin öğe: \`${secilen}\`!` });
        }
      */
    } else if (interaction.isModalSubmit()) {
      // ModalSubmit kodlarını buraya koyun.
      /*
       Örnek:
        if(interaction.customId === "test") {
          const soru1 = interaction.fields.getTextInputValue('soru1');
          return interaction.reply({ content: `Hey <@${interaction.user.id}>, Başarıyla modal submitledin! \n 1. Soruya yazdığın şey: ${soru1}` });
        }
      */
    } else if (interaction.isUserContextMenuCommand()) {
      // ContextMenuCommand kodlarını buraya koyun.
      /*
      Örnek:
       Bilmiyorum Linkteki yere bakın: https://discordjs.guide/interactions/context-menus.html#context-menus 
     */
    } else if (interaction.isAutocomplete()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;
      try {
        await command.autocomplete(interaction, client);
      } catch (err) {
        console.error(err);
      }
    }
  },
};
