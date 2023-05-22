import EventEmitter from "eventemitter3";
import Client from "./Client.js";
import { Collection } from "discord.js";

import { Event, Command, Handler } from "../export.js";

export declare class Loader extends EventEmitter {
  public constructor(client: Client);

  private readonly client: Client;

  public readonly commands: Collection<string, Command>;
  public readonly events: Collection<string, Event>;
  public readonly handlers: Collection<string, Handler>;
  public readonly languages: Array<{ code: string, source: {} }>;
  
  public _EventAndHandler(event: Event, ...args: any[]): Promise<void>;

  public EventAndHandlers(): Promise<void>;
  public Commands(): Promise<void>;
  public All(): Promise<void>;
}

interface Events {
  EventLoaded: "eventLoaded";
  HandlerLoaded: "handlerLoaded";
  CommandLoaded: "commandLoaded";
  Ready: "ready";
}