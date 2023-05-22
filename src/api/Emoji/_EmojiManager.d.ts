import { API } from "../_API";

import { Client, GuildEmojiCreateOptions, GuildEmojiEditOptions, GuildEmoji, Guild, Collection } from "discord.js";

declare class EmojiManager extends API {
  public constructor(client: Client);

  public readonly cache: Collection<string, GuildEmoji>;

  public handle(debug?: boolean): void;

  public get(guild: Guild, emoji: string): Promise<GuildEmoji>;
  public create(guild: Guild, options: GuildEmojiCreateOptions): Promise<GuildEmoji>;
  public edit(guild: Guild, options: GuildEmojiEditOptions): Promise<GuildEmoji>;
  public delete(emoji: string): Promise<void>;
  public list(filter?: (emoji: GuildEmoji, index: number, array: GuildEmoji[]) => boolean): GuildEmoji[];
}