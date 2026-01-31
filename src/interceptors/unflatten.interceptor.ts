/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class UnflattenInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();

    if (
      request.body &&
      (request.headers['content-type'] as string)?.includes(
        'multipart/form-data',
      )
    ) {
      const result = {};
      const { body } = request;
      Object.keys(request.body).forEach((key) => {
        if (key.indexOf('.') !== -1) {
          const keys = key.split('.');
          keys.reduce((acc, part, index) => {
            if (index === keys.length - 1) {
              acc[part] = body[key];
            } else {
              acc[part] = acc[part] || {};
            }
            return acc[part];
          }, result);
        } else {
          result[key] = request.body[key];
        }
      });
      request.body = result;
    }
    return next.handle();
  }
}
