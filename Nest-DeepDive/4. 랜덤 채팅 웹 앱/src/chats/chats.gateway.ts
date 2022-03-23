import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'chattings' })
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger('chat');

  constructor() {
    this.logger.log('constructor');
  }

  afterInit() {
    // constructor 이후 실행되어질 logic
    this.logger.log('init');
  }

  // clien와 connection이 발생하면 실행하는 함수
  handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log(`new user connected : ${socket.id} ${socket.nsp.name}`);
  }

  // client와 connection이 끊기면 실행하는 함수
  handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log(`user disconnected : ${socket.id} ${socket.nsp.name}`);
  }

  @SubscribeMessage('new_user')
  handleNewUser(
    @MessageBody() username: string,
    @ConnectedSocket() socket: Socket,
  ) {
    console.log(username);
    // console.log(socket.id);
    socket.emit('hello_user', 'hello ' + username); // server -> client
  }
}
