import { Base } from "./Base";

import { 
  Client, 
  RESTPostAPIApplicationCommandsJSONBody, RESTPostAPIContextMenuApplicationCommandsJSONBody,

  SlashCommandBuilder, ContextMenuCommandBuilder,

  CommandInteraction, GuildMember, User, Guild, GuildChannel
} from "discord.js";

declare abstract class Command extends Base {
  public constructor(client: Client, options: CommandOptions);

  public readonly data: (RESTPostAPIApplicationCommandsJSONBody | RESTPostAPIContextMenuApplicationCommandsJSONBody);

  public readonly name: string;
  public readonly description: string;
  public readonly enabled: boolean;
  public readonly global: boolean;

  public execute(args: CommandExecuteArguments): Promise<void>;
  public set(data: (ContextMenuCommandBuilder | SlashCommandBuilder)): typeof this.data;
  public setOptions(options: CommandOptions): void;
}

interface CommandOptions {
  name?: string;
  description?: string;
  enabled?: boolean;
  global?: boolean;
}

interface CommandExecuteArguments {
  interaction: CommandInteraction;
  user: User;
  member: GuildMember;
  guild: Guild;
  channel: GuildChannel
}