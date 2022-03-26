import {Dispatch} from "@reduxjs/toolkit";
import {io, ManagerOptions, Socket, SocketOptions} from "socket.io-client";

// const receiveNewMessage = (arg: any) => {};

// export const createListener = () => {};

// export const registerListeners = (socket: Socket, dispatch: Dispatch) => {};

export type CexWsConfig = {
  url: string;
  opts?: Partial<ManagerOptions & SocketOptions>;
};

export class CexWs {
  private static cexws: CexWs;

  private _config: CexWsConfig;
  private _socket: Socket;

  constructor(config: CexWsConfig) {
    this._config = config;
    this._socket = io(this._config.url, this._config.opts);
  }

  get socket() {
    return this._socket;
  }

  get config() {
    return this._config;
  }

  public static ins(config?: CexWsConfig) {
    if (!this.cexws && config) {
      this.cexws = new CexWs(config);
    }

    return this.cexws;
  }
}

const cexws = CexWs.ins({
  url: "http://localhost:3000",
  opts: {
    reconnection: true,
    reconnectionAttempts: 10,
  },
});

export default cexws;
