import { Injectable } from '@nestjs/common';
import { MessageService } from 'src/message/message.service';

@Injectable()
export class NotificationService {
  constructor(private readonly messageService: MessageService) {}

  public async getNotification(userId: string): Promise<any> {
    const unReadMessage = await this.messageService.getUnReadMessage(userId);
    return {
      unReadMessage,
    };
  }
}
