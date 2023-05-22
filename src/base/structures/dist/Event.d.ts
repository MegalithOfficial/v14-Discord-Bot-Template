import { Base } from "./Base";

import { Client, ClientEvents } from "discord.js";

declare abstract class Event extends Base {
  public constructor(client: Client, options: EventOptions);

  public readonly name: Events[keyof Events];
  public readonly type: EventTypes;
  public readonly mode: EventModes;
  public readonly enabled: boolean;
  public readonly once: boolean;

  public execute(): Promise<void>;
  public setOptions(options: EventOptions): void;

  static Events: keyof Events;
}

interface EventOptions {
  name: keyof Events;
  type?: EventTypes;
  mode?: EventModes;
  enabled?: boolean;
  priority?: boolean;
}

type EventTypes = "ChatCommand" | "ContextCommand" | "Button" | "Menu" | "Modal";
type EventModes = "process" | "client";

interface Events extends ClientEvents {
  ApplicationCommandPermissionsUpdate: "applicationCommandPermissionsUpdate",
  AutoModerationActionExecution: "autoModerationActionExecution",
  AutoModerationRuleCreate: "autoModerationRuleCreate",
  AutoModerationRuleDelete: "autoModerationRuleDelete",
  AutoModerationRuleUpdate: "autoModerationRuleUpdate",
  ClientReady: "ready",
  GuildAuditLogEntryCreate: "guildAuditLogEntryCreate",
  GuildCreate: "guildCreate",
  GuildDelete: "guildDelete",
  GuildUpdate: "guildUpdate",
  GuildUnavailable: "guildUnavailable",
  GuildMemberAdd: "guildMemberAdd",
  GuildMemberRemove: "guildMemberRemove",
  GuildMemberUpdate: "guildMemberUpdate",
  GuildMemberAvailable: "guildMemberAvailable",
  GuildMembersChunk: "guildMembersChunk",
  GuildIntegrationsUpdate: "guildIntegrationsUpdate",
  GuildRoleCreate: "roleCreate",
  GuildRoleDelete: "roleDelete",
  InviteCreate: "inviteCreate",
  InviteDelete: "inviteDelete",
  GuildRoleUpdate: "roleUpdate",
  GuildEmojiCreate: "emojiCreate",
  GuildEmojiDelete: "emojiDelete",
  GuildEmojiUpdate: "emojiUpdate",
  GuildBanAdd: "guildBanAdd",
  GuildBanRemove: "guildBanRemove",
  ChannelCreate: "channelCreate",
  ChannelDelete: "channelDelete",
  ChannelUpdate: "channelUpdate",
  ChannelPinsUpdate: "channelPinsUpdate",
  MessageCreate: "messageCreate",
  MessageDelete: "messageDelete",
  MessageUpdate: "messageUpdate",
  MessageBulkDelete: "messageDeleteBulk",
  MessageReactionAdd: "messageReactionAdd",
  MessageReactionRemove: "messageReactionRemove",
  MessageReactionRemoveAll: "messageReactionRemoveAll",
  MessageReactionRemoveEmoji: "messageReactionRemoveEmoji",
  ThreadCreate: "threadCreate",
  ThreadDelete: "threadDelete",
  ThreadUpdate: "threadUpdate",
  ThreadListSync: "threadListSync",
  ThreadMemberUpdate: "threadMemberUpdate",
  ThreadMembersUpdate: "threadMembersUpdate",
  UserUpdate: "userUpdate",
  PresenceUpdate: "presenceUpdate",
  VoiceServerUpdate: "voiceServerUpdate",
  VoiceStateUpdate: "voiceStateUpdate",
  TypingStart: "typingStart",
  WebhooksUpdate: "webhookUpdate",
  InteractionCreate: "interactionCreate",
  Error: "error",
  Warn: "warn",
  Debug: "debug",
  CacheSweep: "cacheSweep",
  ShardDisconnect: "shardDisconnect",
  ShardError: "shardError",
  ShardReconnecting: "shardReconnecting",
  ShardReady: "shardReady",
  ShardResume: "shardResume",
  Invalidated: "invalidated",
  Raw: "raw",
  StageInstanceCreate: "stageInstanceCreate",
  StageInstanceUpdate: "stageInstanceUpdate",
  StageInstanceDelete: "stageInstanceDelete",
  GuildStickerCreate: "stickerCreate",
  GuildStickerDelete: "stickerDelete",
  GuildStickerUpdate: "stickerUpdate",
  GuildScheduledEventCreate: "guildScheduledEventCreate",
  GuildScheduledEventUpdate: "guildScheduledEventUpdate",
  GuildScheduledEventDelete: "guildScheduledEventDelete",
  GuildScheduledEventUserAdd: "guildScheduledEventUserAdd",
  GuildScheduledEventUserRemove: "guildScheduledEventUserRemove",
}