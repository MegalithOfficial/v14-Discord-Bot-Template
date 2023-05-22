import { JsonDatabase as database } from "wio.db";

export class Database extends database {

  /**
   * Constructor of Database class.
   */
  constructor() {
    super({ databasePath: "./database/db.json" });
  };

};