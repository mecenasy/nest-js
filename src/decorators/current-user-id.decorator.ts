import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { getUser } from '../helper/get-user';

export const CurrentUSerId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const user = getUser(ctx);
    return user.id;
  },
);
