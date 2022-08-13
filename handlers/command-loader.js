const fs = require('fs')
const path = require('path')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v10')
const { appId, guildId, token, HandlerMode } = require('../config.json')

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
    if(handlerMode.toLocaleUpperCase == "GUILD" || handlerMode.toLowerCase == "guild" || handlerMode === "Guild") {

    await rest.put(
      Routes.applicationGuildCommands(appId, guildId),
      { body: commands }
    )
    } else if(handlerMode.toLocaleUpperCase == "GLOBAL" || handlerMode.toLowerCase == "global" || handlerMode === "Global") {

      await rest.put(
        Routes.applicationCommands(appId),
        { body: commands }
      )

    } else {
      console.log("[Command-Loader] Geçersiz HandlerModu.")
      process.exit(0)
    }

    console.log('[Command-Loader] Komutlar yüklendi!')
  } catch (error) {
    console.error(error)
  }
})()


