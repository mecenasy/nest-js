import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entity/message.entity';
import { Attachment } from './entity/attachment.entity';
import { TypeConfigService } from 'src/configs/types.config.service';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Attachment, User])],
  controllers: [MessageController],
  providers: [
    MessageService,
    {
      provide: TypeConfigService,
      useExisting: ConfigService,
    },
  ],
})
export class MessageModule {}
