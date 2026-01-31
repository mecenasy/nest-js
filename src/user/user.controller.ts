import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  Request,
  SerializeOptions,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { UserService } from './user.service';
import { type Request as ExpressRequest } from 'express';
import { ProfileResponse } from './response/profile.response';
import { CreateUserDto } from './dto/create-user.dto';
import { CurrentUserId } from 'src/decorators/current-user-id.decorator';
import { File } from 'src/interceptors/fie.interceptor';
import { UnflattenInterceptor } from 'src/interceptors/unflatten.interceptor';
import { StudentService } from 'src/student/student.service';
import { RegisterUserResponse } from './response/register-user.reposnse';
import { Student } from 'src/student/entity/student.entity';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(File)
@SerializeOptions({ strategy: 'excludeAll' })
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly studentService: StudentService,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(UnflattenInterceptor)
  public async registerUser(
    @Body() registerUser: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<RegisterUserResponse> {
    if (file) {
      registerUser.image = file.path;
    }
    let student: Student | undefined = undefined;
    const user = await this.userService.register(registerUser);

    if (registerUser.student) {
      const studentDto = {
        ...registerUser.student,
        user: user,
        studentId: user.id,
      };
      student = await this.studentService.createStudent(studentDto);
    }
    return new RegisterUserResponse({
      id: user.id,
      email: user.email,
      role: user.roles[0].name,
      student,
      person: user.person,
    });
  }

  @Get('profile')
  public async getProfile(@CurrentUserId() id: string) {
    const user = await this.userService.findUserById(id);

    if (!user) {
      throw new NotFoundException();
    }
    return new ProfileResponse(user);
  }

  @Get('admin')
  public getProfile1(@Request() req: ExpressRequest) {
    return new ProfileResponse(req.user);
  }
}
