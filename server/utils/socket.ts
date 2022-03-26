import {Server as HttpServer} from "http";
import SocketIO from "socket.io";

export type HandlersMap = {
  [key: string]: any;
};

export type Builder = (
  io: SocketIO.Server,
  socket: SocketIO.Socket
) => HandlersMap;

export type SocketServerConfig<T extends Builder> = {
  httpServer: HttpServer;
  builders: T[];
};

const registerHandlers = <T extends Builder>(
  io: SocketIO.Server,
  socket: SocketIO.Socket,
  builders: T[]
) => {
  for (let builder of builders) {
    const map = builder(io, socket);

    for (let event in map) {
      socket.on(event, map[event]);
    }
  }
};

export const createSocketServer = <T extends Builder>(
  config: SocketServerConfig<T>
) => {
  const io = new SocketIO.Server(config.httpServer);

  const start = () => {
    io.on("connection", (socket) => {
      registerHandlers(io, socket, config.builders);
    });
  };

  return {
    ioServer: io,
    ioStart: start,
  };
};
