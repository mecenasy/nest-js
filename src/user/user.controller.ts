import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Request,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { UserService } from './user.service';
import { type Request as ExpressRequest } from 'express';
import { AuthGuard } from './auth/user.guard';
import { LoginResponse } from './response/login.response';
import { ProfileResponse } from './response/profile.response';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ strategy: 'excludeAll' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @UseGuards(AuthGuard)
  public getProfile(@Request() req: ExpressRequest) {
    return new ProfileResponse(req.user);
  }
}
