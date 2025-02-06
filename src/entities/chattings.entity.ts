import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Socket } from './sockets.entity';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity('chattings')
export class Chatting {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Socket, (socket) => socket.chatting, { eager: true })
    @JoinColumn({ name: 'user_id' })
    user: Socket;

    @Column({ type: 'text', nullable: false })
    @IsNotEmpty()
    @IsString()
    chat: string;

    @CreateDateColumn({ type: 'datetime' })
    created_at: Date;
}
