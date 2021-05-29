import * as fs from 'fs';

/**
 * @class JSONDBConnection represets JSONDB data repository
 */
class JSONDBConnection {
  /**
   * @param {string} filepath Path of JSONDB table
   */
  constructor(filepath) {
    if (!filepath) {
      throw new Error('JSONDBConnection error: no filepath');
    }

    this._filepath = filepath;
  }

  /**
   * @param {object | any[]} data 
   */
  save(data) {
    fs.writeFileSync(this._filepath, JSON.stringify(data, null, 2));
  }

  /**
   * @returns {any[]}
   */
  get() {
    return JSON.parse(fs.readFileSync(this._filepath));
  }
}

/**
 * @export connectionFactory
 * @param {string} table DB table to connect
 */
export const connectionFactory = table => new JSONDBConnection(`${process.cwd()}/src/db/${table}.json`);