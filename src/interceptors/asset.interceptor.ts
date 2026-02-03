/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { AppConfig } from 'src/configs/app.config';
import { TypeConfigService } from 'src/configs/types.config.service';

@Injectable()
export class AssetsInterceptor implements NestInterceptor {
  constructor(private readonly configService: TypeConfigService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const appUrl = this.configService.get<AppConfig>('app')?.appUrl;
        const port = this.configService.get<AppConfig>('app')?.port;
        const url = `${appUrl}:${port}`;

        const processObject = (obj: Record<string, any>) => {
          const keys = Object.keys(obj);

          keys.forEach((key) => {
            if (Array.isArray(obj[key])) {
              obj[key].forEach((item) => {
                if (item && typeof item === 'object') processObject(item);
              });
            } else if (obj[key] && typeof obj[key] === 'object') {
              processObject(obj[key]);
            } else {
              if ((key === 'image' || key === 'photo') && obj[key]) {
                obj[key] = `${url}/static/${obj[key]}`;
              }
            }
          });
        };

        if (Array.isArray(data)) {
          data.forEach((item) => {
            if (item && typeof item === 'object') processObject(item);
          });
        } else if (data && typeof data === 'object') {
          processObject(data);
        }

        return data;
      }),
    );
  }
}
