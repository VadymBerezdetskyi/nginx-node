import { Repository } from '../components/repository.js';
import { connectionFactory } from '../components/connection.js';

class MessagesRepository extends Repository {
  /**
   * @param {string} id
   * @returns {Message|null}
   */
  getById(id) {
    return this.getAll()
      .map(e => new Message(e))
      .find(m => m.id === id) || null;
  }

  /**
   * @param {Message} message 
   */
  addOrUpdate(message) {
    let all = this.getAll();
    let found = false;

    all.map(e => new Message(e))
      .map(m => {
        if (m.id === message.id) {
          found = true;
          return message;
        } else {
          return m;
        }
      });

    if (!found) {
      all.push(message);
    }

    this._connection.save(all);
  }
}

const connection = connectionFactory('messages');

export const messagesRepository = new MessagesRepository(connection);

export class Message {
  /**
   * @param {{
   *  id: string;
   *  data: string | undefined;
   *  seenBy: string[] | undefined;
   * }} param0 
   */
  constructor({ id, data, seenBy }) {
    if (!id) {
      throw new Error('Id is necessary');
    }

    this.id = id;
    this.data = data || '';
    this.seenBy = seenBy || [];
  }
}