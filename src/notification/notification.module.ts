import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { NotificationService } from './notification.service';
import { MessageModule } from 'src/message/message.module';

@Module({
  imports: [EventEmitterModule, MessageModule],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
