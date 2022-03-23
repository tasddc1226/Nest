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

  // 새로운 유저 입장시 실행하는 함수
  @SubscribeMessage('new_user')
  handleNewUser(
    @MessageBody() username: string,
    @ConnectedSocket() socket: Socket,
  ) {
    console.log(username);
    // TODO: username DB save

    // 연결된 모든 socket에게 data 전송
    socket.broadcast.emit('user_connected', username);
    return username; // server -> client
  }

  // 새로운 채팅 broadcast
  @SubscribeMessage('submit_chat')
  handleSubmitChat(
    @MessageBody() chat: string,
    @ConnectedSocket() socket: Socket,
  ) {
    socket.broadcast.emit('new_chat', {
      chat,
      username: socket.id,
    });
  }
}
