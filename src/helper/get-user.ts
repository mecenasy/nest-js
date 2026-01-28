import { ExecutionContext } from '@nestjs/common';
import { User } from '..//user/entity/user.entity';

export const getUser = (context: ExecutionContext) => {
  return context.switchToHttp().getRequest<Request & { user: User }>().user;
};
