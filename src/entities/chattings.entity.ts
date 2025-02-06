import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { SocketEntity } from './sockets.entity';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity('chattings')
export class ChattingEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => SocketEntity, (socket) => socket.chatting, {
        eager: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'user_id' })
    user: SocketEntity;

    @Column({ type: 'text', nullable: false })
    @IsNotEmpty()
    @IsString()
    chat: string;

    @CreateDateColumn({ type: 'datetime' })
    created_at: Date;
}
