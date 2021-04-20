import { JSONRPCServer } from "json-rpc-2.0";

const server = new JSONRPCServer();

server.addMethod("echo", ({ text }) => text);

export { server };