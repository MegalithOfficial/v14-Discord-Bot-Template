const fs = require('fs')
const path = require('path')

const { Client } = require('discord.js')
const client = new Client({ intents: 32639 })
const { token } = require('./config.json')

require("./handlers/command-loader.js")
require("./handlers/event-handler.js")(client)
require("./handlers/command-handler.js")(client)

process.on('uncaughtException', err => console.error(err))
client.login(token)
