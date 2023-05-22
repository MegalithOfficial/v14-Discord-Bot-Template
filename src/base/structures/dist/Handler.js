import Event from "./Event.js";

import { Client } from "discord.js";
export class Handler extends Event {
  /**
   * @param {Client} client 
   * @param {{ name: string, type?: "ChatCommand" | "ContextCommand" | "Button" | "Menu" | "Modal", mode?: "client" | "process", enabled?: boolean, priority?: boolean }} handlerOptions
   * @constructor
   */
  constructor(client, handlerOptions) {
    super(client, handlerOptions);
  };
};

export default Handler;