const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("autocomplete")
    .setDescription("Autocomplete test")
    .addStringOption((option) => // string, integer, boolean, number kullanılabilir
      option
        .setName("string")
        .setDescription("String test")
        .setAutocomplete(true)
        .setRequired(true)
    ),
  // https://discordjs.guide/slash-commands/autocomplete.html <-- Bu linkten nasıl yapıldığına bakabilirsiniz
  async autocomplete(interaction, client) {
    const focusedValue = interaction.options.getFocused();
    const choices = [
      "Popular Topics: Threads",
      "Sharding: Getting started",
      "Library: Voice Connections",
      "Interactions: Replying to slash commands",
      "Popular Topics: Embed preview",
    ];
    const filtered = choices.filter((choice) =>
      choice.startsWith(focusedValue)
    );
    await interaction.respond(
      filtered.map((choice) => ({ name: choice, value: choice }))
    );
  },
  async execute(interaction, client) {
    const option = interaction.options.getString("string");

    await interaction.reply({ content: option });
  },
};
