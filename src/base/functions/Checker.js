export function Checker(data) {
  function type() {
    let type = (typeof data);

    if (Array.isArray(data)) type = "array";
    else if (data == null || data == "null") type = "null";

    return type;
  };

  /**
   * Checks if data is Boolean.
   * @returns {boolean}
   */
  function isBoolean() {
    if (isNull() || isUndefined()) return false;

    if (type() === "boolean") return true;
    else return false;
  };

  /**
   * Checks if data is String.
   * @returns {boolean}
   */
  function isString() {
    if (isNull() || isUndefined()) return false;

    if (type() === "string") return true;
    else return false;
  };

  /**
   * Checks if data is Object.
   * @returns {boolean}
   */
  function isObject() {
    if (isNull() || isUndefined()) return false;

    if (type() === "object") return true;
    else return false;
  };

  /**
   * Checks if data is Symbol.
   * @returns {boolean}
   */
  function isSymbol() {
    if (isNull() || isUndefined()) return false;

    if (type() === "symbol") return true;
    else return false;
  };

  /**
   * Checks if data is Array.
   * @returns {boolean}
   */
  function isArray() {
    if (isNull() || isUndefined()) return false;

    if (type() === "array") return true;
    else return false;
  };

  /**
   * Checks if data is Number.
   * @returns {boolean}
   */
  function isNumber() {
    if (isNull() || isUndefined()) return false;

    if (type() === "number") return true;
    else return false;
  };

  /**
   * Checks if data is Function.
   * @returns {boolean}
   */
  function isFunction() {
    if (isNull() || isUndefined()) return false;

    if (type() === "function") return true;
    else return false;
  };

  /**
   * Checks if data is Undefined.
   * @returns {boolean}
   */
  function isUndefined() {
    if (type() === "undefined") return true;
    else return false;
  };

  /**
   * Checks if data is Null.
   * @returns {boolean}
   */
  function isNull() {
    if (type() === "null") return true;
    else return false;
  };

  /**
   * Checks if data is BigInt.
   * @returns {boolean}
   */
  function isBigInt() {
    if (isNull() || isUndefined()) return false;

    if (type() === "bigint") return true;
    else return false;
  };

  /**
   * Checks if data (number) is NaN.
   * @returns {boolean}
   */
  function _isNaN() {
    return isNaN(data);
  };

  /**
   * Checks if data (number) is Finite.
   * @returns {boolean}
   */
  function _isFinite() {
    return isFinite(data);
  };

  /**
   * Checks if data is Available.
   * @returns {boolean}
   */
  function isAvailable() {
    if (isNull() || isUndefined()) return false;
    else return true;
  };

  /**
   * Checks that the data is not Boolean.
   * @returns {boolean}
   */
  function isNotBoolean() {
    if (isBoolean()) return false;
    else return true;
  };

  /**
   * Checks that the data is not String.
   * @returns {boolean}
   */
  function isNotString() {
    if (isString()) return false;
    else return true;
  };

  /**
   * Checks that the data is not Object.
   * @returns {boolean}
   */
  function isNotObject() {
    if (isObject()) return false;
    else return true;
  };

  /**
   * Checks that the data is not Symbol.
   * @returns {boolean}
   */
  function isNotSymbol() {
    if (isSymbol()) return false;
    else return true;
  };

  /**
   * Checks that the data is not Array.
   * @returns {boolean}
   */
  function isNotArray() {
    if (isArray()) return false;
    else return true;
  };

  /**
   * Checks that the data is not Number.
   * @returns {boolean}
   */
  function isNotNumber() {
    if (isNumber()) return false;
    else return true;
  };

  /**
   * Checks that the data is not Function.
   * @returns {boolean}
   */
  function isNotFunction() {
    if (isFunction()) return false;
    else return true;
  };

  /**
   * Checks that the data is not Undefined.
   * @returns {boolean}
   */
  function isNotUndefined() {
    if (isUndefined()) return false;
    else return true;
  };

  /**
   * Checks that the data is not Null.
   * @returns {boolean}
   */
  function isNotNull() {
    if (isNull()) return false;
    else return true;
  };

  /**
   * Checks that the data is not BigInt.
   * @returns {boolean}
   */
  function isNotBigInt() {
    if (isBigInt()) return false;
    else return true;
  };

  /**
   * Checks that the data (number) is not NaN.
   * @returns {boolean}
   */
  function isNotNaN() {
    if (_isNaN()) return false;
    else return true;
  };

  /**
   * Checks that the data (number) is not Finite.
   * @returns {boolean}
   */
  function isNotFinite() {
    if (_isFinite()) return false;
    else return true;
  };

  /**
   * Checks that the data is not Available.
   * @returns {boolean}
   */
  function isNotAvailable() {
    if (isAvailable()) return false;
    else return true;
  };

  return {
    isNotArray,
    isNotAvailable,
    isNotBigInt,
    isNotBoolean,
    isNotFunction,
    isNotNull,
    isNotNumber,
    isNotString,
    isNotObject,
    isNotSymbol,
    isNotNaN,
    isNotFinite,
    isNotUndefined,
    isArray,
    isAvailable,
    isBigInt,
    isBoolean,
    isFunction,
    isNull,
    isNumber,
    isObject,
    isString,
    isSymbol,
    isUndefined,
    isNaN: _isNaN,
    isFinite: _isFinite
  };
};

import config from "../../config/config.js";
export function isOwner(data) {
  if (config.Bot.Developers.includes(data)) return true;
  else return false;
};

export default Checker;