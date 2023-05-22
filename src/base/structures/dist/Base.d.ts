import {
  EmbedBuilder, ActionRowBuilder, ButtonBuilder,
  RoleSelectMenuBuilder, ChannelSelectMenuBuilder, MentionableSelectMenuBuilder,
  UserSelectMenuBuilder, ModalBuilder, TextInputBuilder,
  AttachmentBuilder, SlashCommandBuilder, ContextMenuCommandBuilder,
  StringSelectMenuBuilder,

  EmbedData, ActionRowData, ButtonComponentData, 
  ModalComponentData, TextInputComponentData, BufferResolvable,
  AttachmentData,

  CommandInteraction,

  Client, Collection
} from "discord.js";

import config from "../../../config/config.js";

import API, {
  GuildManager, MessageManager,
  EmojiManager, ChannelManager,
  InviteManager, VoiceManager,
  RoleManager
} from "../../../api/export.js";

import Checker, { isOwner } from "../../functions/Checker.js";

declare abstract class Base {
  public constructor(client: Client);

  private readonly _client: Client;

  protected SlashCommand: typeof SlashCommandBuilder;
  protected ContextCommand: typeof ContextMenuCommandBuilder;

  protected readonly config: typeof config;

  protected api: API;
  protected guilds: GuildManager;
  protected messages: MessageManager;
  protected emojis: EmojiManager;
  protected channels: ChannelManager;
  protected invites: InviteManager;
  protected connections: VoiceManager;
  protected roles: RoleManager;

  protected check: typeof Checker;
  protected isOwner: typeof isOwner;

  protected client: Client;

  protected commands: Collection<string, import("./Command").Command>;
  protected events: Collection<string, import("./Event").Event>;
  protected handlers: Collection<string, import("./Handler").Command>;
  protected languages: Collection<string, { code: string, source: {} }>;
  protected cooldowns: Collection<string, number>;

  protected Embed(data?: EmbedData): EmbedBuilder;
  protected Row(data?: ActionRowData): ActionRowBuilder;
  protected Button(data?: ButtonComponentData): ButtonBuilder;
  protected Menu(type: BaseMenuTypes, data?: any): StringSelectMenuBuilder | RoleSelectMenuBuilder | ChannelSelectMenuBuilder | MentionableSelectMenuBuilder | UserSelectMenuBuilder;
  protected Modal(data?: ModalComponentData): ModalBuilder;
  protected TextInput(data?: TextInputComponentData): TextInputBuilder;
  protected Attachment(header: BufferResolvable, data?: AttachmentData): AttachmentBuilder;

  protected time(timestamp: number, { format, onlyNumber }: { format?: string, onlyNumber?: boolean }): string | number;
  protected code(content: string, language?: string): string;
  protected pagination(interaction: CommandInteraction, { embeds, buttons }: { embeds: (EmbedBuilder | EmbedData)[], buttons?: (ButtonBuilder | ButtonComponentData)[] }): Promise<void>;
}

type BaseMenuTypes = "Role" | "Channel" | "Mentionable" | "User" | "String";