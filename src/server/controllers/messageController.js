import axios from 'axios';
import { Message, messagesRepository } from '../repositories/messagesRepository.js';
import { peersRepository } from '../repositories/peersRepository.js';

export const messageController = ({ data, peer, id, seenBy }) => {
  console.log(peer);
  let peers = [...new Set([...seenBy || [], peer])];
  console.log(peers)
  let message = messagesRepository.getById(id);
  if (!message) {
    message = new Message({ data, seenBy: peers, id });
  } else {
    peers = [...new Set([...message.seenBy, ...peers])];
    message.seenBy = peers;
  }
  
  // save message
  messagesRepository.addOrUpdate(message);

  // send to all known peers
  peersRepository.getAll().forEach(peer => {
    axios.create({ baseURL: peer }).post({
      "jsonrpc": "2.0",
      "id": 12314,
      "method": "message",
      "params": message,
    });
  });

  // save discovered peers
  peers.forEach(p => peersRepository.add(p));

  return { success: true };
};