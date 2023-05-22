import Base from "./Base.js";

import { s } from "@sapphire/shapeshift";

import { error } from "../../Utils.js";

import { Client, SlashCommandBuilder, ContextMenuCommandBuilder } from "discord.js";
export class Command extends Base {
  /**
   * @param {Client} client 
   * @param {import("./Command.js").CommandOptions} commandOptions
   * @constructor
   */
  constructor(client, commandOptions) {
    super(client);

    let { name, description, enabled, global } = commandOptions;
    enabled ??= false;
    global ??= true;

    s.string.parse(name);
    s.string.parse(description);
    s.boolean.parse(enabled);
    s.boolean.parse(global);

    /**
     * @type {string}
     */
    this.name = name.trim().replaceAll(" ", "_");

    /**
     * @type {string}
     */
    this.description = description.trim();

    /**
     * @type {boolean}
     */
    this.enabled = enabled;

    /**
     * @type {boolean}
     */
    this.global = global;

    /**
     * @type {import("discord.js").RESTPostAPIApplicationCommandsJSONBody}
     * @type {import("discord.js").RESTPostAPIContextMenuApplicationCommandsJSONBody}
     * @readonly
     */
    this.data = {};
  };

  /**
   * @param {{ interaction: import("discord.js").CommandInteraction, member: import("discord.js").GuildMember, user: import("discord.js").User, channel: import("discord.js").Channel, guild: import("discord.js").Guild }} args
   * @returns {Promise<void>}
   */
  async execute(args) {
    return void 0;
  };

  /**
   * Set the command.
   * @param {SlashCommandBuilder | ContextMenuCommandBuilder} data
   * @returns {import("discord.js").RESTPostAPIApplicationCommandsJSONBody | import("discord.js").RESTPostAPIContextMenuApplicationCommandsJSONBody} 
   */
  set(data) {
    if (!(data instanceof SlashCommandBuilder) && !(data instanceof ContextMenuCommandBuilder)) error(TypeError, "InvalidBuilder", `${data} is not a Command builder.`);

    if (this.name) data.setName(this.name);
    if (this.description) data.setDescription(this.description);

    const command = data.toJSON();

    if (!this.name) this.name = command.name;
    if (!this.description) this.description = command.description;
    
    this.data = command;

    return command;
  };

  /**
   * Set/Edit command options.
   * @param {{ name: string, description: string, enabled: boolean, global: boolean }} options
   * @returns {void}
   */
  setOptions(options) {
    const names = Object.keys(options);

    for (let index = 0; index < names.length; index++) {
      const name = names[index];
      const value = options[name];

      if (!this[name]) break;

      this[name] = value;
    };

    return void 0;
  };
};

export default Command;