import { Repository } from '../components/repository.js';
import { connectionFactory } from '../components/connection.js';

class PeersRepository extends Repository {
  /**
   * @param {string} item
   */
  add(item) {
    if (!this._connection) {
      throw new Error('Repository: no conection');
    }

    this._connection.save([
      ...new Set([...this.getAll(), item ])
    ]);
  }
}

const connection = connectionFactory('peers');

export const peersRepository = new PeersRepository(connection);