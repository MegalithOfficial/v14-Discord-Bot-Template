const fs = require('fs')
const path = require('path')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v10')
const { bot } = require('../config')

const commands = []
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

const getFilesRecursively = (directory) => {
  const filesInDirectory = fs.readdirSync(directory)
  for (const file of filesInDirectory) {
    const absolute = path.join(directory, file)
    if (fs.statSync(absolute).isDirectory()) {
      getFilesRecursively(absolute)
    } else {
      commandFiles.push(absolute)
    }
  }
}
getFilesRecursively('./commands/')

for (const file of commandFiles) {
  const command = require(`../${file}`)
  commands.push(command.data.toJSON())
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    if(bot.handlerMode.toLocaleUpperCase() === "GUILD" || bot.handlerMode.toLowerCase() === "guild" || bot.handlerMode === "Guild") {

    await rest.put(
      Routes.applicationGuildCommands(appId, guildId),
      { body: commands }
    )
    } else if(bot.handlerMode.toLocaleUpperCase() === "GLOBAL" || bot.handlerMode.toLowerCase() === "global" || bot.handlerMode === "Global") {

      await rest.put(
        Routes.applicationCommands(appId),
        { body: commands }
      )

    } else {
      console.log("[Command-Loader] Invalid handler mode: " + bot.handlerMode)
      process.exit(0)
    }

    console.log('[Command-Loader] Slash Commands Loaded.')
  } catch (error) {
    console.error(error)
  }
})()


