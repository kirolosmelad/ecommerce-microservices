import { OnGatewayConnection, WebSocketGateway } from "@nestjs/websockets";
import { Socket } from "socket.io";

@WebSocketGateway({ transports: ["websocket"] })
export class ChatGateway implements OnGatewayConnection {
  handleConnection(socket: Socket) {
    console.log(`NEW Socket connection ${socket.id}`);
  }
}
