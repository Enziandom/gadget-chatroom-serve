import { createServer } from "http";
import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
import { updateUser } from "../database/userDB";

const httpServer = createServer();
const server = new Server(httpServer, {
  cors: { origin: true, credentials: true }
});

/**
 * 监听客户端连接
 */
server.on("connection", (socket: any) => {
  socket.on("sending", (e: any) => {
    socket.broadcast.emit("broadcast", e);
  });

  socket.on("send-private", (e: any) => {
    socket.to(e.socket_id).emit("echo-private", e);
  });

  socket.on("disconnect", () => {
    updateUser({ is_online: 0, socket_id: "" }, [], () => {
      return { socket_id: socket.id };
    });
  });
});

instrument(server, { auth: false });

export default httpServer;
