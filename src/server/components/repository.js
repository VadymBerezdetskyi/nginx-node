export class Repository {
  /**
   * @param {{
   *  get(): any[];
   *  save(data: any): void;
   * }} connection 
   */
  constructor(connection) {
    this._connection = connection;
  }

  /**
   * @returns {any[]}
   */
  getAll() {
    return this._connection.get();
  }
}