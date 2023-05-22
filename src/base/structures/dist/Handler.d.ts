import { Event, EventOptions } from "./Event";

import { Client } from "discord.js";

declare abstract class Handler extends Event {
  public constructor(client: Client, options: EventOptions);
}