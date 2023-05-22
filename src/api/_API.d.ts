import { Client, RequestData, REST, Routes } from "discord.js";

declare class API {
  public constructor(client: Client, headers?: RequestData);

  private headers: RequestData;
  private rest: REST;

  protected readonly client: Client;  

  protected request(route: string, options?: typeof this.headers, method?: APIMethods): Promise<unknown>;

  static wait(seconds?: number): Promise<any>;
  static headers: RequestData;
  static Routes: typeof Routes;
}

type APIMethods = "GET" | "POST" | "PUT" | "PATCH" | "TRACE" | "DELETE";