import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  Query,
  SerializeOptions,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { UserService } from './user.service';
import { ProfileResponse } from './response/profile.response';
import { CreateUserDto } from './dto/create-user.dto';
import { CurrentUserId } from 'src/decorators/current-user-id.decorator';
import { File } from 'src/interceptors/fie.interceptor';
import { UnflattenInterceptor } from 'src/interceptors/unflatten.interceptor';
import { RegisterUserResponse } from './response/register-user.reposnse';
import { AssetsInterceptor } from 'src/interceptors/asset.interceptor';
import { Roles } from 'src/decorators/role.decorator';
import { UserListResponse } from './response/user-list.response';
import { GetUsersParams } from './params/get-users.params';
import { UserQueryService } from './user-query.service';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(File)
@SerializeOptions({ strategy: 'excludeAll' })
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userQueryService: UserQueryService,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(UnflattenInterceptor)
  @UseInterceptors(AssetsInterceptor)
  public async registerUser(
    @Body() registerUser: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<RegisterUserResponse> {
    if (file) {
      registerUser.image = file.path;
    }
    const user = await this.userService.register(registerUser);

    return new RegisterUserResponse({
      id: user.id,
      email: user.email,
      role: user.roles[0].name,
      student: user.student,
      person: user.person,
    });
  }

  @Get('profile')
  @UseInterceptors(AssetsInterceptor)
  public async getProfile(
    @CurrentUserId() id: string,
  ): Promise<ProfileResponse> {
    const user = await this.userService.findUserById(id);

    if (!user) {
      throw new NotFoundException();
    }

    return new ProfileResponse(user);
  }

  @Get('all')
  @Roles('admin')
  @UseInterceptors(AssetsInterceptor)
  public async getAllUsers(
    @Query() query: GetUsersParams,
  ): Promise<UserListResponse> {
    const data: UserListResponse = await this.userQueryService.getUsersByQuery(
      query,
      true,
    );

    return new UserListResponse(data);
  }

  @Get('students')
  @Roles('admin', 'teacher')
  @UseInterceptors(AssetsInterceptor)
  public async getAllStudents(
    @Query() query: GetUsersParams,
  ): Promise<UserListResponse> {
    query.roles = ['student'];
    const data: UserListResponse =
      await this.userQueryService.getUsersByQuery(query);

    return new UserListResponse(data);
  }

  @Get('teachers')
  @UseInterceptors(AssetsInterceptor)
  public async getAllTeacher(
    @Query() query: GetUsersParams,
  ): Promise<UserListResponse> {
    query.roles = ['teacher'];
    const data: UserListResponse =
      await this.userQueryService.getUsersByQuery(query);

    return new UserListResponse(data);
  }
}
