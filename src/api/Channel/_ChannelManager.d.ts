import { API } from "../_API";

import { Client, GuildChannel, ChannelCreateOptions, GuildChannelEditOptions, RequestData, Collection } from "discord.js";

declare class ChannelManager extends API {
  public constructor(client: Client);
  
  public readonly cache: Collection<string, GuildChannel>;

  public handle(debug?: boolean): Promise<void>;

  public get(channel: string): Promise<GuildChannel>;
  public create(guild: string, options: ChannelCreateOptions): Promise<GuildChannel>;
  public delete(channel: string): Promise<void>;
  public edit(channel: GuildChannel, options: GuildChannelEditOptions): Promise<GuildChannel>;
  public list(filter?: (channel: GuildChannel, index: number, array: GuildChannel[]) => boolean): GuildChannel[];
}