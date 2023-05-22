import {
  EmbedBuilder, ActionRowBuilder, ButtonBuilder,
  RoleSelectMenuBuilder, ChannelSelectMenuBuilder, MentionableSelectMenuBuilder,
  UserSelectMenuBuilder, ModalBuilder, TextInputBuilder,
  AttachmentBuilder, SlashCommandBuilder, ContextMenuCommandBuilder,
  StringSelectMenuBuilder,

  CommandInteraction,

  Client, Collection
} from "discord.js";

import { s } from "@sapphire/shapeshift";
import { Database } from "../../classes/Database.js";

import config from "../../../config/config.js";

import API, {
  GuildManager, MessageManager,
  EmojiManager, ChannelManager,
  InviteManager, VoiceManager,
  RoleManager
} from "../../../api/export.js";

import Checker, { isOwner } from "../../functions/Checker.js";
import { error, commands, events, handlers, cooldowns, languages } from "../../Utils.js";

export class Base {
  constructor(client) {
    /**
     * @private
     */
    this._client = client;

    /**
     * @type {typeof SlashCommandBuilder}
     * @protected
     */
    this.SlashCommand = SlashCommandBuilder;

    /**
     * @type {typeof ContextMenuCommandBuilder}
     * @protected
     */
    this.ContextCommand = ContextMenuCommandBuilder;

    /**
     * @type {config}
     * @protected
     */
    this.config = config;

    /**
     * Custom API
     * @type {API}
     * @protected
     */
    this.api = new API(this);

    /**
     * Guild Manager
     * @type {GuildManager}
     * @protected
     */
    this.guilds = new GuildManager(this.client);

    /**
     * Emoji Manager
     * @type {EmojiManager}
     * @protected
     */
    this.emojis = new EmojiManager(this.client);

    /**
     * Voice Connection Manager
     * @type {VoiceManager}
     * @protected
     */
    this.connections = new VoiceManager(this.client);

    /**
     * Channel Manager
     * @type {ChannelManager}
     * @protected
     */
    this.channels = new ChannelManager(this.client);

    /**
     * Invite Manager
     * @type {InviteManager}
     * @protected
     */
    this.invites = new InviteManager(this.client);

    /**
     * Role Manager
     * @type {RoleManager}
     * @protected
     */
    this.roles = new RoleManager(this.client);

    /**
     * Message Manager
     * @type {MessageManager}
     * @protected
     */
    this.messages = new MessageManager(this.client);

    /**
     * @type {Checker}
     * @param {any} data
     * @protected
     */
    this.check = (data) => (Checker(data));

    /**
     * @type {isOwner}
     * @protected
     */
    this.isOwner = isOwner;

    this.db = new Database();
  };

  /**
   * @returns {Client}
   * @protected
   */
  get client() {
    return this._client;
  };

  /**
   * @returns {Collection<string, import("./Command.js").default>}
   * @protected
   */
  get commands() {
    return commands;
  };

  /**
   * @returns {Collection<string, import("./Event.js").default>}
   * @protected
   */
  get events() {
    return events;
  };

  /**
   * @returns {Collection<string, import("./Handler.js").default>}
   * @protected
   */
  get handlers() {
    return handlers;
  };

  /**
   * @returns {Collection<string, number>}
   * @protected
   */
  get cooldowns() {
    return cooldowns;
  };

  /**
   * @returns {Collection<string, import("../../classes/Language.js").default>}
   * @protected
   */
  get languages() {
    return languages;
  };

  /**
   * Creates new Embed.
   * @returns {EmbedBuilder}
   * @protected
   */
  Embed = EmbedBuilder;

  /**
   * Creates new Row.
   * @returns {ActionRowBuilder}
   * @protected
   */
  Row = ActionRowBuilder;

  /**
   * Creates new Button.
   * @returns {ButtonBuilder}
   * @protected
   */
  Button = ButtonBuilder;

  /**
   * Creates new Menu.
   * @param {string} type 
   * @param {any} header
   * @returns {StringSelectMenuBuilder | RoleSelectMenuBuilder | ChannelSelectMenuBuilder | MentionableSelectMenuBuilder | UserSelectMenuBuilder}
   * @protected
   */
  Menu(type, header = null) {
    s.string.parse(type);

    let menu = new StringSelectMenuBuilder(header);

    if (type === "Role") menu = new RoleSelectMenuBuilder(header);
    else if (type === "Channel") menu = new ChannelSelectMenuBuilder(header);
    else if (type === "Mentionable") menu = new MentionableSelectMenuBuilder(header);
    else if (type === "User") menu = new UserSelectMenuBuilder(header);

    return menu;
  };

  /**
   * Creates new Modal.
   * @returns {ModalBuilder}
   * @protected
   */
  Modal = ModalBuilder;

  /**
   * Creates new Text Input.
   * @returns {TextInputBuilder}
   * @protected
   */
  TextInput = TextInputBuilder;

  /**
   * Creates new Attachment.
   * @param {import("discord.js").BufferResolvable | import("node:stream").Stream} header 
   * @param {import("discord.js").AttachmentData} data 
   * @returns 
   * @protected
   */
  Attachment(header, data) {
    return (new AttachmentBuilder(header, data));
  };

  /**
   * Transform time.
   * @param {number} timestamp 
   * @param {{ format?: string, onlyNumber?: boolean }} options 
   * @returns {string | number}
   * @protected
   */
  time(timestamp, options = { format: "R", onlyNumber: false }) {
    s.number.parse(timestamp);

    let { format, onlyNumber } = options;

    format ??= "R";
    onlyNumber ??= false;

    s.string.parse(format);
    s.boolean.parse(onlyNumber);

    const formatted = Math.floor(timestamp / 1000);

    const availableStyles = ["t", "T", "d", "D", "f" /* default (in discord) */, "F", "R" /* default (in this code) */]; // https://discord.com/developers/docs/reference#message-formatting-timestamp-styles
    if (!availableStyles.includes(format)) throw new Error("InvalidStyle", `This style is not supported. (${format})`);

    return (onlyNumber ? formatted : `<t:${formatted}:${format}>`);
  };

  /**
   * Create new Discord Codeblock.
   * @param {string} content 
   * @param {string} language 
   * @returns {string}
   * @protected
   */
  code(content, language = "js") {
    s.string.parse(content);
    s.string.parse(language);

    const output = `\`\`\`${language.toLowerCase()}\n${content}\`\`\``;

    return output;
  };

  /**
   * Discord Pagination System with Buttons
   * @param {CommandInteraction} interaction 
   * @param {{ embeds?: EmbedBuilder[], buttons?: ButtonBuilder[] }} options
   * @returns {Promise<void>}
   * @protected
   */
  async pagination(interaction, options = { embeds: [], buttons: [] }) {
    if (interaction && !(interaction instanceof CommandInteraction)) error(TypeError, "InvalidType", `'${interaction}' is not a Command Interaction.`);

    let { embeds, buttons } = options;
    embeds ??= [];
    buttons ??= [];

    const efirst = this.client.emojis.resolve("1042498687533846528");
    const eprev = this.client.emojis.resolve("1042498269013622844");
    const edel = this.client.emojis.resolve("1042498264517312582");
    const enext = this.client.emojis.resolve("1042498266765471814");
    const elast = this.client.emojis.resolve("1042498633532186695");

    const first = new this.Button({
      style: ButtonStyle.Secondary,
      emoji: { name: efirst.name, id: efirst.id },
      customId: "0",
    });

    const prev = new this.Button({
      style: ButtonStyle.Primary,
      emoji: { name: eprev.name, id: eprev.id },
      customId: "1",
    });

    const del = new this.Button({
      style: ButtonStyle.Danger,
      emoji: { name: edel.name, id: edel.id },
      customId: "2",
    });

    const next = new this.Button({
      style: ButtonStyle.Primary,
      emoji: { name: enext.name, id: enext.id },
      customId: "3",
    });

    const last = new this.Button({
      style: ButtonStyle.Secondary,
      emoji: { name: elast.name, id: elast.id },
      customId: "4",
    });

    const buttonsRow = new this.Row({
      components: [first, prev, del, next, last]
    });

    let currentPage = 0;

    const disableFirst = ButtonBuilder.from(first).setDisabled(true).setStyle(ButtonStyle.Danger);
    const disableLast = ButtonBuilder.from(last).setDisabled(true).setStyle(ButtonStyle.Danger);
    const disablePrev = ButtonBuilder.from(prev).setDisabled(true).setStyle(ButtonStyle.Danger);
    const disableNext = ButtonBuilder.from(next).setDisabled(true).setStyle(ButtonStyle.Danger);

    const styledDelete = ButtonBuilder.from(del).setStyle(ButtonStyle.Success);

    let components = [
      new ActionRowBuilder({
        components: [
          (currentPage === 0) ? disableFirst : first,
          (currentPage === 0) ? disablePrev : prev,
          (currentPage === 0) || (embeds.length - 1) ? styledDelete : del,
          (currentPage === (embeds.length - 1)) ? disableNext : next,
          (currentPage === (embeds.length - 1)) ? disableLast : last
        ]
      })
    ];
    components = components.concat(buttons);

    let sendMessage;

    if (embeds.length === 0) {
      if (interaction.deferred) return interaction.followUp({ embeds: [embeds[0]], components });
      else sendMessage = interaction.replied ? await interaction.editReply({ embeds: [embeds[0]], components }) : await interaction.reply({ embeds: [embeds[0]], components });
    };

    embeds = embeds.map((embed, _index) => {
      const INDEX = (_index + 1);

      return embed.setFooter({ text: `Total: ${embeds.length} | Viewing: ${INDEX} | Remaining: ${(embeds.length - INDEX)}`, iconURL: interaction.guild?.iconURL() });
    });

    if (interaction.deferred) sendMessage = await interaction.followUp({ embeds: [embeds[0]], components });
    else sendMessage = interaction.replied ? await interaction.editReply({ embeds: [embeds[0]], components }) : await interaction.reply({ embeds: [embeds[0]], components });

    let filter = async (m) => {
      if (interaction.member.id !== m.member.id) await interaction.followUp({ content: `${this.config.Emoji.State.ERROR} ${m.member}, You cannot interact with this buttons.`, ephemeral: true });

      return (interaction.member.id === m.member.id);
    };

    const collector = await sendMessage.createMessageComponentCollector({ filter });

    collector.on("collect", async (i) => {
      if (!i.isButton()) return;

      await i.deferUpdate();

      switch (i.customId) {
        case "0": {
          currentPage = 0;

          let components = [
            new ActionRowBuilder({
              components: [
                (currentPage === 0) ? disableFirst : first,
                (currentPage === 0) ? disablePrev : prev,
                (currentPage === 0) ? styledDelete : del,
                (currentPage === (embeds.length - 1)) ? disableNext : next,
                (currentPage === (embeds.length - 1)) ? disableLast : last
              ]
            })
          ];
          components = components.concat(buttons);

          await sendMessage.edit({ embeds: [embeds[currentPage]], components });

          break;
        };
        case "1": {
          if (currentPage !== 0) {
            currentPage--;

            let components = [
              new ActionRowBuilder({
                components: [
                  (currentPage === 0) ? disableFirst : first,
                  (currentPage === 0) ? disablePrev : prev,
                  (currentPage === 0) ? styledDelete : del,
                  (currentPage === (embeds.length - 1)) ? disableNext : next,
                  (currentPage === (embeds.length - 1)) ? disableLast : last
                ]
              })
            ];
            components = components.concat(buttons);

            await sendMessage.edit({ embeds: [embeds[currentPage]], components });
          } else {
            currentPage = ((embeds.length - 1));

            let components = [
              new ActionRowBuilder({
                components: [
                  (currentPage === 0) ? disableFirst : first,
                  (currentPage === 0) ? disablePrev : prev,
                  (currentPage === 0) ? styledDelete : del,
                  (currentPage === (embeds.length - 1)) ? disableNext : next,
                  (currentPage === (embeds.length - 1)) ? disableLast : last
                ]
              })
            ];
            components = components.concat(buttons);

            await sendMessage.edit({ embeds: [embeds[currentPage]], components });
          };

          break;
        };
        case "2": {
          /**
           * @param {ButtonBuilder} button 
           * @returns {void}
           */
          const callback = (button) => {
            button.setDisabled(true);
            button.setStyle(this.ButtonStyle.Secondary);

            return void 0;
          };

          components[0].components.map(callback);

          await sendMessage.edit({ embeds: [embeds[currentPage]], components });

          break;
        };
        case "4": {
          currentPage = ((embeds.length - 1));

          let components = [
            new ActionRowBuilder({
              components: [
                (currentPage === 0) ? disableFirst : first,
                (currentPage === 0) ? disablePrev : prev,
                (currentPage === (embeds.length - 1)) ? styledDelete : del,
                (currentPage === (embeds.length - 1)) ? disableNext : next,
                (currentPage === (embeds.length - 1)) ? disableLast : last
              ]
            })
          ];
          components = components.concat(buttons);

          await sendMessage.edit({ embeds: [embeds[currentPage]], components });

          break;
        };

        default: null;
      };
    });

    collector.on("end", async () => {
      /**
       * @param {ButtonBuilder} button 
       * @returns {void}
       */
      const callback = (button) => {
        button.setDisabled(true).setStyle(this.ButtonStyle.Secondary);

        return void 0;
      };

      components[0].components.map(callback);

      await sendMessage.edit({ embeds: [embeds[0]], components });
    });

    return void 0;
  };
};

export default Base;