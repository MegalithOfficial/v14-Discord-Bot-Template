import API from "../API.js";

import { s } from "@sapphire/shapeshift";

import { GuildManager } from "../Guild/GuildManager.js";
export class RoleManager extends API {
  /**
   * @param {import("discord.js").Client} client 
   * @constructor
   */
  constructor(client) {
    super(client, { headers: API.headers });

    /**
     * @type {GuildManager}
     * @private
     */
    this.guilds = new GuildManager(client);
  };

  /**
   * Retrieves the data of the specified role from the specified server.
   * @param {string} guild 
   * @param {string} role
   * @returns {Promise<import("discord.js").Role>}
   */
  async get(guild, role) {
    s.string.parse(guild);
    s.string.parse(role);

    const server = await this.guilds.get(guild);
    let roleData = await this.request(API.Routes.guildRoles(server.id));

    roleData = roleData.filter((r) => r.id === roleData.id)[0];

    return roleData;
  };

  /**
   * Creates a new role on the specified server.
   * @param {string} guild 
   * @param {import("discord.js").RoleCreateOptions} options
   * @returns {Promise<import("discord.js").Role>}
   */
  async create(guild, options) {
    s.string.parse(guild);

    const server = await this.guilds.get(guild);
    const role = await this.request(API.Routes.guildRoles(server.id), options, "POST");

    const data = (await this.guilds.get(server.id)).roles.resolve(role.id);

    return data;
  };

  /**
   * Edits the specified role of the specified server.
   * @param {string} guild 
   * @param {string} role 
   * @param {import("discord.js").RoleEditOptions} options
   * @returns {Promise<import("discord.js").Role>}
   */
  async edit(guild, role, options) {
    s.string.parse(guild);
    s.string.parse(role);

    const server = await this.guilds.get(guild);
    const roleData = await this.request(API.Routes.guildRole(server.id, role), options, "PATCH");

    const data = (await this.guilds.get(server.id)).roles.resolve(roleData.id);

    return data;
  };

  /**
   * Deletes the specified role of the specified server.
   * @param {string} guild 
   * @param {string} role 
   * @returns {Promise<import("discord.js").Role>}
   */
  async delete(guild, role) {
    s.string.parse(guild);
    s.string.parse(role);

    const server = await this.guilds.get(guild);
    const roleData = server.roles.resolve(role);
    await this.request(API.Routes.guildRole(server.id, roleData.id), options, "DELETE");

    return roleData;
  };

  /**
   * 
   * @param {string} guild 
   * @param {(role: import("discord.js").Role, index: number, array: (import("discord.js").Role)[]) => boolean} filter
   * @returns {(import("discord.js").Role)[]}
   */
  list(guild, filter = null) {
    s.string.parse(guild);

    /**
     * @type {Array<import("discord.js").Role>}
     */
    let roleList = [];

    const roles = this.client.guilds.resolve(guild).roles.cache;
    for (let index = 0; index < roles.size; index++) {
      /**
       * @type {import("discord.js").Role}
       */
      const role = roles[index];
      if (!role) break;

      roleList.push(role);
    };

    if (filter && typeof filter === "function") roleList = roleList.filter(filter);

    return roleList;
  };
}; 