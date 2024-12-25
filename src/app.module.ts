import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { getMysqlTypeOrmModule } from './getMysqlTypeOrmModule';
import { ChatGateway } from './chat/chat.gateway';
import { ChatModule } from './chat/chat.module'; 

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV}`,
        }),
        getMysqlTypeOrmModule,
        ChatModule,
    ],
    controllers: [AppController],
    providers: [ChatGateway],
})
export class AppModule {}
