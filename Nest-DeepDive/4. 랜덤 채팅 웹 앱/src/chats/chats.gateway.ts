import { Model } from 'mongoose';
import { Chatting } from './models/chattings.model';
import { Socket as SocketModel } from './models/sockets.model';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
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

  constructor(
    @InjectModel(Chatting.name) private readonly chattingModel: Model<Chatting>,
    @InjectModel(SocketModel.name)
    private readonly socketModel: Model<SocketModel>,
  ) {
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
  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    const user = await this.socketModel.findOne({ id: socket.id });
    if (user) {
      socket.broadcast.emit('disconnect_user', user.username);
      await user.delete();
      this.logger.log(`user disconnected : ${socket.id} ${socket.nsp.name}`);
    }
  }

  // 새로운 유저 입장시 실행하는 함수
  @SubscribeMessage('new_user')
  async handleNewUser(
    @MessageBody() username: string,
    @ConnectedSocket() socket: Socket,
  ) {
    const isExist = await this.socketModel.exists({ username });
    console.log(username, isExist);

    if (isExist) {
      username = `${username}_${Math.floor(Math.random() * 100)}`;
    }

    // username DB save
    await this.socketModel.create({
      id: socket.id,
      username,
    });

    // 연결된 모든 socket에게 data 전송
    socket.broadcast.emit('user_connected', username);
    return username; // server -> client
  }

  // 새로운 채팅 broadcast
  @SubscribeMessage('submit_chat')
  async handleSubmitChat(
    @MessageBody() chat: string,
    @ConnectedSocket() socket: Socket,
  ) {
    const socketObj = await this.socketModel.findOne({ id: socket.id });

    // 특정 user의 채팅 기록을 남긴다.
    await this.chattingModel.create({
      user: socketObj,
      chat: chat,
    });

    socket.broadcast.emit('new_chat', {
      chat,
      username: socketObj.username,
    });
  }
}
