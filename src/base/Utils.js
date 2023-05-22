import { URL } from "node:url";
import { Collection } from "discord.js";
import { s } from "@sapphire/shapeshift";
import { resolveColor as Color } from "discord.js";

const PATH = (new URL(process.cwd(), import.meta.url).pathname);


function resolveColor(color) {
  return Color(color)
}

/**
 * Create new Error.
 * @param {TypeErrorConstructor | RangeErrorConstructor | ErrorConstructor} constructor
 * @param {string} name 
 * @param {string} message
 * @returns {void}
 */
export function error(constructor, name, message) {
  /**
   * @type {TypeError | RangeError | Error}
   */
  const body = new constructor(message);
  body.name = name;

  throw body;
};

/**
 * @param {number} seconds 
 * @returns {Promise} 
 */
export async function delay(seconds = 1) {
  s.number.parse(seconds);

  const promise = new Promise((resolve) => setTimeout(resolve, Math.floor(seconds * 1000)));

  return promise;
};

const storage = {};

/**
 * Creates new Storage.
 * @param {string} name 
 * @returns {Collection<string, any>}
 */
export function Storage(name, overWrite = false) {
  s.string.parse(name);
  s.boolean.parse(overWrite);

  let data = storage[name];

  if (data && !overWrite) return data;
  else if (overWrite && data) storage[name] = new Collection();
  else storage[name] = new Collection();

  data = storage[name];

  return data;
};

export const commands = Storage("commands");
export const cooldowns = Storage("cooldowns");
export const events = Storage("events");
export const handlers = Storage("handlers");
export const languages = Storage("languages");

export default PATH;