import { Controller, Sse, MessageEvent, Param, Get } from '@nestjs/common';
import { map, Observable, interval, merge, fromEvent, filter } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MessageNotification } from './interface';
import { NotificationService } from './notification.service';
import { CurrentUserId } from 'src/decorators/current-user-id.decorator';

@Controller('notification')
export class NotificationController {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly notifications: NotificationService,
  ) {}

  @Sse('stream/:userId')
  stream(@Param('userId') userId: string): Observable<MessageEvent> {
    const events$ = fromEvent(this.eventEmitter, 'msg.sent').pipe(
      filter((payload: MessageNotification) => {
        return payload.userId === userId;
      }),
      map((payload: MessageNotification) => ({
        data: { count: payload.count },
      })),
    );

    const heartbeat$ = interval(10000).pipe(
      map(() => ({ type: 'ping', data: {} }) as MessageEvent),
    );

    return merge(events$, heartbeat$);
  }

  @Get()
  public async getNotifications(@CurrentUserId() userId: string): Promise<any> {
    return await this.notifications.getNotification(userId);
  }
  // @Sse('stream')
  // sendNotifications(): Observable<MessageEvent> {
  //   return interval(5000).pipe(
  //     map((_) => {
  //       return {
  //         data: {
  //           new_message: true,
  //           unread_count: Math.floor(Math.random() * 10),
  //         },
  //       };
  //     }),
  //   );
  // }
}
