import { IsNotEmpty, IsString } from 'class-validator';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ChattingEntity } from './chattings.entity';

@Entity('sockets')
export class SocketEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true, nullable: false })
    @IsNotEmpty()
    @IsString()
    username: string;

    @OneToMany(() => ChattingEntity, (chat) => chat.user)
    chatting: ChattingEntity[];

    @CreateDateColumn({ type: 'datetime' })
    created_at: Date;

    @UpdateDateColumn({ type: 'datetime' })
    updated_at: Date;
}
