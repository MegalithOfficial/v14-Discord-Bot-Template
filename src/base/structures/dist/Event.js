import Base from "./Base.js";

import { s } from "@sapphire/shapeshift";

import { Client, Events } from "discord.js";
export class Event extends Base {
  /**
   * @param {Client} client 
   * @param {{ name: string, type?: import("./Event").EventTypes, mode?: import("./Event").EventModes, enabled?: boolean, priority?: boolean }} eventOptions
   * @constructor
   */
  constructor(client, eventOptions) {
    super(client);

    let { name, enabled, type, priority, mode } = eventOptions;
    enabled ??= false;
    global ??= true;
    type ??= "ChatCommand";
    priority ??= false;
    mode ??= "client";

    s.string.parse(name);
    s.string.parse(type);
    s.string.parse(mode);
    s.boolean.parse(enabled);
    s.boolean.parse(priority);    

    /**
     * @type {string}
     */
    this.name = name.trim();

    /**
     * @type {string}
     */
    this.type = type;

    /**
     * @type {string}
     */
    this.mode = mode;

    /**
     * @type {boolean}
     */
    this.enabled = enabled;

    /**
     * @type {boolean}
     */
    this.once = priority;
  };

  /**
   * @returns {Promise<void>}
   */
  async execute() {
    return void 0;
  };

  /**
   * Set/Edit event options.
   * @param {{ name: string, enabled: boolean }} options
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

  /**
   * @type {typeof Events}
   * @readonly
   */
  static Events = Events;
};

export default Event;