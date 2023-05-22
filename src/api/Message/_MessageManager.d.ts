import { API } from "../_API";

import { Client, Message, Guild, MessageCreateOptions } from "discord.js";

import { ChannelManager } from "../Channel/_ChannelManager";

declare class MessageManager extends API {
  public constructor(client: Client);

  private channels: ChannelManager;

  public handle(debug?: boolean): void;

  public get(channel: string, message: string): Promise<Message>;
  public create(channel: string, options: MessageCreateOptions): Promise<Message>;
  public list(channel: string, filter?: (message: Message, index: number, array: Message[]) => boolean): Message[];
}