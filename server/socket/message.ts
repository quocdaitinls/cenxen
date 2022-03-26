import SocketIO from "socket.io";

export const messageBuilder = (
  io: SocketIO.Server,
  socket: SocketIO.Socket
) => {
  const send_message = (content: string) => {
    console.log("New message: ", content);
  };

  return {
    send_message,
  };
};
