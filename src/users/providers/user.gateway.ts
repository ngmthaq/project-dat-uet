import { Server, Socket } from "socket.io";
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";

@WebSocketGateway()
export class UserGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  public handleConnection(client: Socket, ...args: any[]) {
    client.emit("user-connect", args);
    this.server.emit("user-connect", "New user connected");
  }

  public handleDisconnect(client: Socket) {
    client.emit("user-disconnect");
    this.server.emit("user-connect", "An user disconnected");
  }

  @SubscribeMessage("send-message")
  public handleMessage(@MessageBody() body: string, @ConnectedSocket() client: Socket) {
    client.emit("new-message", body);
  }
}
