import PATH, { commands as BASE_COMMANDS, languages as BASE_LANGUAGES, handlers as BASE_HANDLERS, events as BASE_EVENTS } from "../Utils.js";
import { statSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

import { Client, BaseInteraction, Collection } from "discord.js";
import ora from "ora";
import EventEmitter from "eventemitter3";

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export class Loader extends EventEmitter {
  /**
   * @param {Client} client
   * @constructor
   */
  constructor(client) {
    super();

    /**
     * @private
     */
    this.client = client;

    /**
     * @type {Array<Collection<string, import("../export.js").Event>>}
     * @readonly
     */
    this.events = [];

    /**
     * @type {Array<Collection<string, import("../export.js").Command>>}
     * @readonly
     */
    this.commands = [];

    /**
     * @type {Array<Collection<string, import("../export.js").Handler>>}
     * @readonly
     */
    this.handlers = [];

    /**
     * @type {Array<{ code: string, source: {} }>}
     * @readonly
     */
    this.languages = [];

    this.isFile = function (path, dir, file) {
      if (typeof path !== "string") throw new TypeError("PATH must be a STRING!");
      if (typeof dir !== "string") throw new TypeError("DIR must be a STRING!");
      if (typeof file !== "string") throw new TypeError("FILE must be a STRING!");

      const scanFile = statSync(this.resolve(path + "/" + dir + "/" + file)).isFile();

      return scanFile;
    };

    this.isFolder = function (path, dir) {
      if (typeof path !== "string") throw new TypeError("PATH must be a STRING!");
      if (typeof dir !== "string") throw new TypeError("DIR must be a STRING!");

      const scanFolder = statSync(this.resolve(path + "/" + dir)).isDirectory();

      return scanFolder;
    };

    this.resolve = function (path) {
      if (typeof path !== "string") throw new TypeError("PATH must be a STRING!");

      return resolve(path);
    };

    this.read = function (path) {
      if (typeof path !== "string") throw new TypeError("PATH must be a STRING!");

      return readdirSync(this.resolve(path));
    };
  };

  /**
   * Load events and handlers into Loader.
   * @returns {Promise<void>}
   */
  async EventsAndHandlers() {
    let spinner = ora("Events Loading...").start();

    const eventsPath = this.resolve("./src/bot/events");

    try {
      await Promise.all(this.read(eventsPath).filter((dir) => this.isFolder(eventsPath, dir)).map(async (dir) => {
        if (dir === "handlers") return;

        await Promise.all(this.read(`${eventsPath}/${dir}`).filter((file) => this.isFile(eventsPath, dir, file) && file.endsWith(".js")).map(async (file) => {
          await (import(`../../bot/events/${dir}/${file}`)).then((constructor) => {
            /**
             * @type {import("../export.js").Event}
             */
            const event = new (constructor.default)(this.client);

            if (event?.name) {
              if (event.enabled) {
                BASE_EVENTS.set(event.name, event);
                this.events.push(event);

                let Base = (event.mode === "client" ? this.client : process);
                let Once = (event.once ? "once" : "on");

                if (event?.enabled) Base[Once](event.name, (...args) => this._EventAndHandler(event, ...args));

                this.emit("eventLoaded", event);
              };

            };
          });
        }))
      }))
    } catch (err) {
      spinner.fail("An Error occurred while loading events " + err.stack)
    }


    spinner = spinner.render().start("Handlers Loading");

    const handlersPath = this.resolve("./src/bot/handlers");

    try {
      await Promise.all(this.read(handlersPath).filter((dir) => this.isFolder(handlersPath, dir)).map(async (dir) => {

        await Promise.all(this.read(`${handlersPath}/${dir}`).filter((file) => this.isFile(handlersPath, dir, file) && file.endsWith(".js")).map(async (file) => {
          await (import(`../../bot/handlers/${dir}/${file}`)).then((constructor) => {
            /**
            * @type {import("../export.js").Handler}
            */
            const handler = new (constructor.default)(this.client);

            if (handler?.name) {
              if (handler.enabled) {
                BASE_HANDLERS.set(handler.name, handler);
                this.handlers.push(handler);

                let Base = (handler.mode === "client" ? this.client : process);
                let Once = (handler.once ? "once" : "on");

                Base[Once](handler.name, (...args) => this._EventAndHandler(handler, ...args));

                this.emit("handlerLoaded", handler);
              };

            };
          });
        }))
      }))
    } catch (err) {
      spinner.fail("An Error occurred while loading handlers " + err.stack)
    }

    spinner.stop();

    return void 0;
  };

  /**
   * Load commands into Loader.
   * @returns {Promise<void>}
   */
  async Commands() {
    const commandPath = this.resolve("./src/bot/commands");

    let spinner = ora("Commands Loading").start();

    try {
      await Promise.all(this.read(commandPath).filter((dir) => this.isFolder(commandPath, dir)).map(async (dir) => {
        if (dir === "handlers") return;

        await Promise.all(this.read(`${commandPath}/${dir}`).filter((file) => this.isFile(commandPath, dir, file) && file.endsWith(".js")).map(async (file) => {
          await (import(`../../bot/commands/${dir}/${file}`)).then((constructor) => {
              /**
                * @type {import("../export.js").Command}
               */
            const command = new (constructor.default)(this.client);

            if (command?.name) {
              if (command.enabled) {
                BASE_COMMANDS.set(command.name, command);
                this.commands.push(command.data);

                this.emit("commandLoaded", command);
              };

            };
          });
        }))
      }))
    } catch (err) {
      spinner.fail("An Error occurred while loading handlers " + err.stack)
    }
    spinner.stop();

    return void 0;
  };

  /**
   * Load all utils.
   * @returns {Promise<void>}
   */
  async All() {
    await this.EventsAndHandlers();
    await this.Commands();

    this.emit("ready", true);

    return void 0;
  };

  /**
   * @param {import("../export.js").Event} event
   * @param  {...any} args
   * @private
   */
  _EventAndHandler(event, ...args) {
    const interaction = args[0];

    if (interaction instanceof BaseInteraction) {
      if (event?.type === "Button" && (interaction.isButton())) event.execute(...args);
      else if (event?.type === "ChatCommand" && (interaction.isChatInputCommand())) event.execute(...args);
      else if (event?.type === "ContextCommand" && (interaction.isContextMenuCommand())) event.execute(...args);
      else if (event?.type === "Menu" && (interaction.isMentionableSelectMenu() || interaction.isChannelSelectMenu() || interaction.isRoleSelectMenu() || interaction.isStringSelectMenu() || interaction.isUserSelectMenu())) event.execute(...args);
      else if (event?.type === "Modal" && (interaction.isModalSubmit())) event.execute(...args);

      else event.execute(...args);
    }

    else event.execute(...args);
  };
};

export default Loader;