import { API } from "../_API";

import { Client, InviteCreateOptions, Invite, Collection } from "discord.js";

declare class InviteManager extends API {
  public constructor(client: Client);

  public readonly cache: Collection<string, Invite>;

  public handle(debug?: boolean): void;

  public get(code: string): Promise<Invite>;
  public create(channel: string, options: InviteCreateOptions): Promise<Invite>;
  public delete(code: string): Promise<void>;
  public list(filter?: (invite: Invite, index: number, array: Invite[]) => boolean): Invite[];
}