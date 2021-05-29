import { JSONRPCServer } from "json-rpc-2.0";
import { messageController } from "./controllers/messageController.js";

const server = new JSONRPCServer();

server.addMethod("message", messageController);

export { server };