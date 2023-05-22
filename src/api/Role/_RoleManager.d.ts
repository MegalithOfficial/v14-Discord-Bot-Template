import { API } from "../_API";

import { Client, RoleCreateOptions, Guild, Role, RoleEditOptions } from "discord.js";

import { GuildManager } from "../Guild/_GuildManager";

declare class RoleManager extends API {
  public constructor(client: Client);

  private guilds: GuildManager;

  public handle(debug?: boolean): void;

  public get(guild: string, role: string): Promise<Role>;
  public create(guild: string, options: RoleCreateOptions): Promise<Role>;
  public edit(guild: string, role: string, options: RoleEditOptions): Promise<Role>;
  public delete(guild: string, role: string): Promise<void>;
  public list(guild: string, filter?: (role: Role, index: number, array: Role[]) => boolean): Role[];
}