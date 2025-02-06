import { IsNotEmpty, IsString } from 'class-validator';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Chatting } from './chattings.entity';

@Entity('sockets')
export class Socket {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true, nullable: false })
    @IsNotEmpty()
    @IsString()
    username: string;

    @OneToMany(() => Chatting, (chat) => chat.user)
    chatting: Chatting[];

    @CreateDateColumn({ type: 'datetime' })
    created_at: Date;

    @UpdateDateColumn({ type: 'datetime' })
    updated_at: Date;
}
