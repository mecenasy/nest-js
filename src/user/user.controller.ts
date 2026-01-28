import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';

import { UserService } from './user.service';
import { type Request as ExpressRequest } from 'express';
import { ProfileResponse } from './response/profile.response';
import { Roles } from '../decorators/role.decorator';
import { IUser } from './model/user.model';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ strategy: 'excludeAll' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  public async registerUser(
    @Body() registerUser: CreateUserDto,
  ): Promise<IUser | null> {
    return await this.userService.register(registerUser);
  }
  @Get('profile')
  public getProfile(@Request() req: ExpressRequest) {
    return new ProfileResponse(req.user);
  }

  @Get('admin')
  @Roles('STUDENT')
  public getProfile1(@Request() req: ExpressRequest) {
    return new ProfileResponse(req.user);
  }
}
