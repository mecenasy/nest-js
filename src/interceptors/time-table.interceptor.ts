/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { MenuResponse } from 'src/menu/response/menu.response';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class TimeTableInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<MenuResponse[]>,
  ): Observable<any> {
    const { user } = context
      .switchToHttp()
      .getRequest<Request & { user: User }>();

    const userRole = user.roles[0].name;

    return next.handle().pipe(
      map((data) => {
        data.forEach((item) => {
          switch (userRole) {
            case 'student': {
              if (item.link.includes('time-table')) {
                item.link = `${item.link}?type=group&group=${user.student.group}&year=${user.student.year}`;
              }
              break;
            }
            case 'teacher': {
              if (item.link.includes('time-table')) {
                item.link = `${item.link}?type=teacher`;
              }
              break;
            }
            default: {
              if (item.link.includes('time-table')) {
                item.link = `${item.link}?type=specialty`;
              }
              break;
            }
          }
        });

        return data;
      }),
    );
  }
}
