import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'dgram';

@WebSocketGateway()
export class ChatsGateway {
  @SubscribeMessage('new_user')
  handleNewUser(
    @MessageBody() username: string,
    @ConnectedSocket() socket: Socket,
  ) {
    console.log(username);
    socket.emit('hello_user', 'hello ' + username); // server -> client
  }
}
