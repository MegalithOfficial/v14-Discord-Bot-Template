import { API } from "../_API";

import { Client, GuildCreateOptions, GuildEditOptions, Guild, Collection } from "discord.js";

declare class GuildManager extends API {
  public constructor(client: Client);

  public readonly cache: Collection<string, Guild>;

  public handle(debug?: boolean): void;

  public get(guild: string): Promise<Guild>;
  public leave(guild: string): Promise<Guild>;
  public create(options: GuildCreateOptions): Promise<Guild>;
  public edit(guild: string, options: GuildEditOptions): Promise<Guild>;
  public list(filter?: (guild: Guild, index: number, array: Guild[]) => boolean): Guild[];
}