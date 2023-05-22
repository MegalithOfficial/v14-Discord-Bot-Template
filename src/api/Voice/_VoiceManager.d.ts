import { API } from "../_API";

import { JoinVoiceChannelOptions, CreateVoiceConnectionOptions } from "@discordjs/voice";

declare class VoiceManager extends API {
  public constructor(client: Client);

  private options: (JoinVoiceChannelOptions | CreateVoiceConnectionOptions);

  public handle(debug?: boolean): void;

  public setOptions(options: typeof this.options): void;
  public create(channels: string[]): number;
  public get(guilds: string[]): VoiceResult;
}

interface VoiceResult {
  guild: string;
  state: boolean;
}