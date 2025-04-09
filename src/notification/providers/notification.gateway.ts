import { User } from "@/user/entities/user.entity";
import { UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway()
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server: Server;

  public constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  public async handleConnection(@ConnectedSocket() client: Socket) {
    const authorization = client.handshake.headers.authorization;
    if (!authorization) return client.disconnect(true);
    const user: User = await this.check(authorization);
    if (!user) return client.disconnect(true);
    client.join(user.id.toString());
  }

  public async handleDisconnect(@ConnectedSocket() client: Socket) {
    const authorization = client.handshake.headers.authorization;
    if (!authorization) return client.disconnect(true);
    const user: User = await this.check(authorization);
    if (!user) return client.disconnect(true);
    client.leave(user.id.toString());
  }

  public async check(authorization: string): Promise<User> {
    try {
      const [type, text] = authorization.split(" ") ?? [];
      const token = type === "Bearer" ? text : undefined;
      const secret = this.configService.get<string>("secret");
      const payload = await this.jwtService.verifyAsync(token, { secret });
      return payload;
    } catch {
      throw new UnauthorizedException();
    }
  }

  public async emit(to: string, data: any) {
    this.server.to(to).emit("notification", data);
  }
}
