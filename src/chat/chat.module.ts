import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocketEntity } from '../entities/sockets.entity';
import { ChattingEntity } from '../entities/chattings.entity';

@Module({
    imports: [TypeOrmModule.forFeature([SocketEntity, ChattingEntity])],
    providers: [ChatGateway],
})
export class ChatModule {}
