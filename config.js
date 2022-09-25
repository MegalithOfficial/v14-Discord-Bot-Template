const { IntentsBitField, OAuth2Scopes } = require('discord.js')

module.exports = {
    bot: {
        token: "", // Enter Bot Token / Bot Tokenini girin.
        appId: "", // Enter Application Id / Bot idsini girin.
        guildId: "", // Enter Guild Id if handlerMode Set as "Guild" / Eğer handlerMode "Guild" ise Sunucu idsini girin.
        ownerId: "", // Enter Owner discord id / Bot sahibinin idsini girin.
        handlerMode: "Global", // If you want bot work at all guilds set as "Global". If you want only work in single guild set as "Guild" // eğer botun tüm sunucularda çalışmasını istiyorsan "Global" yaz. eğer botun tek bir sunucuda çalışmasını istiyorsan "Guild" yaz.
        intents: [
            IntentsBitField.Flags.Guilds,
            IntentsBitField.Flags.GuildMembers,
            IntentsBitField.Flags.GuildBans,
            IntentsBitField.Flags.GuildEmojisAndStickers,
            IntentsBitField.Flags.GuildIntegrations,
            IntentsBitField.Flags.GuildWebhooks,
            IntentsBitField.Flags.GuildVoiceStates,
            IntentsBitField.Flags.GuildPresences,
            IntentsBitField.Flags.GuildMessages,
            IntentsBitField.Flags.DirectMessages,
            IntentsBitField.Flags.MessageContent
        ],
        scopes: [
            OAuth2Scopes.Bot, 
            OAuth2Scopes.ApplicationsCommands,
        ]
    },

    colors: { // Embed Colors / Embed için renkler
       red: "#B11C25",
       green: "#1bed0c",
       orange: "#e69138",
       blue: "#0f7ccf",
       gray: "#999999",
       white: "#ffffff",
    },
}