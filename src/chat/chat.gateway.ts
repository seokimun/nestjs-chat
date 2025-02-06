import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
import { ChattingEntity } from '../entities/chattings.entity';
import { Repository } from 'typeorm';
import { SocketEntity } from '../entities/sockets.entity';

@WebSocketGateway({ namespace: 'chattings' })
export class ChatGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
    private logger = new Logger('chat');

    constructor(
        @InjectRepository(ChattingEntity)
        private readonly chattingRepository: Repository<ChattingEntity>,
        @InjectRepository(SocketEntity)
        private readonly socketRepository: Repository<SocketEntity>,
    ) {
        this.logger.log('constructor');
    }

    afterInit() {
        this.logger.log('init');
    }

    handleConnection(@ConnectedSocket() socket: Socket) {
        this.logger.log(`connected : ${socket.id} ${socket.nsp.name}`);
    }

    async handleDisconnect(@ConnectedSocket() socket: Socket) {
        const user = await this.socketRepository.findOne({
            where: { id: socket.id },
        });
        if (user) {
            socket.broadcast.emit('disconnect_user', user.username);
            await this.socketRepository.delete(user.id);
        }
        this.logger.log(`disconnected : ${socket.id} ${socket.nsp.name}`);
    }

    @SubscribeMessage('new_user')
    async handleNewUser(
        @MessageBody() username: string,
        @ConnectedSocket() socket: Socket,
    ) {
        const exist = await this.socketRepository.findOne({
            where: { username },
        });

        if (exist) {
            username = `${username}_${Math.floor(Math.random() * 100)}`;
        }

        const user = this.socketRepository.create({
            id: socket.id,
            username,
        });

        await this.socketRepository.save(user);

        socket.broadcast.emit('user_connected', username);
        return username;
    }

    @SubscribeMessage('submit_chat')
    async handleSubmitChat(
        @MessageBody() chat: string,
        @ConnectedSocket() socket: Socket,
    ) {
        const socketObj = await this.socketRepository.findOne({
            where: { id: socket.id },
        });

        const chats = this.chattingRepository.create({
            user: socketObj,
            chat: chat,
        });

        await this.chattingRepository.save(chats);

        socket.broadcast.emit('new_chat', {
            chat,
            username: socketObj.username,
        });
    }
}
