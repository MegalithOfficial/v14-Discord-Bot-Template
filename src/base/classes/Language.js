import config from "../../config/config.js";

import { s } from "@sapphire/shapeshift";
import lodash from "lodash";

export class Language {
  /**
   * @param {any} provider 
   * @param {string} language 
   * @constructor
   */
  constructor(provider, language = config.LANG) {
    s.string.parse(language);

    /**
     * @private
     */
    this.provider = provider;

    /**
     * @protected
     */
    this.lang = language;

    /**
     * @private
     */
    this._data = {};

    const langs = this.provider.toJSON();
    for (let index = 0; index < langs.length; index++) {
      let { code } = langs[index];
      code ??= this.lang;

      this._data[code] = langs[index];
    };
  };

  get data() {
    return (new Object(this._data));
  };

  /**
   * 
   * @param {string} key 
   * @param {{ lang?: string, variables?: {} }} options 
   * @returns 
   */
  translate(key, options = { lang: this.lang, variables: {} }) {
    let { lang, variables } = options;
    s.string.parse(key);

    lang ??= this.lang;
    s.string.parse(lang);

    variables ??= {};

    /**
     * @type {string | undefined}
     */
    let translation = (lodash.get(this.data[lang], key) ?? this.provider.get(`${lang}/${key}`));
    if (!translation) return translation;

    const keys = Object.keys(variables);
    for (let index = 0; index < keys.length; index++) {
      const name = keys[index];

      if (!translation.includes(`$${name}`)) break;

      translation = translation.replaceAll(`$${name}`, variables[name]);
    };

    return translation;
  };

  /**
   * Check the translate is available.
   * @param {string} key
   * @param {string} lang
   * @returns {boolean | null}
   */
  has(key, lang = this.lang) {
    s.string.parse(key);
    s.string.parse(lang);

    if (!this.data.hasOwnProperty(lang)) return null;

    const data = lodash.has(this.data[lang], key);

    return data;
  };

  /**
   * Get translate.
   * @param {string} key 
   * @param {string} lang
   * @returns {string | null}
   */
  get(key, lang = this.lang) {
    s.string.parse(key);
    s.string.parse(lang);

    if (!this.has(key)) return null;

    const data = lodash.get(this.data[lang], key);

    return data;
  };

  /**
   * Set translate.
   * @param {string} key 
   * @param {string} value
   * @param {string} lang
   * @returns {this}
   */
  set(key, value, lang = this.lang) {
    s.string.parse(key);
    s.string.parse(value);
    s.string.parse(lang);

    if (!this.data.hasOwnProperty(lang)) {
      this._data[lang] = {};

      lodash.set(this._data[lang], key, value);
    };

    this.provider.set(lang.concat(`/${key}`), value);

    return this;
  };
};

export default Language;