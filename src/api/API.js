import Discord, { REST, Routes, Client } from "discord.js";

import { s } from "@sapphire/shapeshift";

const token = process.env["TOKEN"];

/**
 * @abstract
 */
export default class API {
  /**
   * @param {Client} client
   * @constructor
   */
  constructor(client, headers = {}) {
    /**
     * @type {Client}
     * @protected
     */
    this.client = client;

    /**
     * @type {object}
     * @private
     */
    this.headers = headers;

    /**
     * @type {REST}
     * @private
     */
    this.rest = new REST().setToken(token);
  };

  /**
   * Send request.
   * @param {string} route
   * @param {import("discord.js").RequestData} options
   * @param {import("./_API").APIMethods} method
   * @returns {Promise<unknown>}
   * @protected
   */
  async request(route, options = {}, method = "GET") {
    s.string.parse(route);
    s.string.parse(method);

    method = method.toLowerCase();

    const availableMethods = ["GET", "POST", "PATCH", "DELETE", "PUT", "TRACE"];
    if (!availableMethods.includes(method.toUpperCase())) throw new Error("InvalidMethod", `This method is not supported. (${method})`);

    const opts = {
      ...options,
      headers: this.headers
    };

    const response = await this.rest[method](route, opts);

    return response;
  };

  /**
   * @param {number} seconds 
   * @returns {Promise<any>}
   */
  static async wait(seconds = 1) {
    s.number.parse(seconds);

    return (new Promise((resolve) => setTimeout(resolve, Math.floor(seconds * 1000))));
  };

  /**
   * @readonly
   */
  static headers = {
    Authorization: `Bot ${token}`,
    "Content-Type": "application/json"
  };

  /**
   * @readonly
   */
  static Routes = Routes;
};