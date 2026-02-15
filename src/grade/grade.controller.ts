import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { GradeService } from './grade.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { Roles } from 'src/decorators/role.decorator';
import { GetGradeByStudentResponse } from './response/get-grade-by-student.response';
import { GetGradeByTeacherResponse } from './response/get-grade-by-teacher.response';
import { CreateGradeResponse } from './response/create-grade.response';
import { UpdateGradeResponse } from './response/update-grade.response';
import { GradeResponse } from './response/grade.response';

@Controller('grade')
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ strategy: 'excludeAll' })
export class GradeController {
  constructor(private readonly gradeService: GradeService) {}

  @Post()
  async create(@Body() dto: CreateGradeDto[]): Promise<CreateGradeResponse[]> {
    const result = await Promise.all(
      dto.map((item) => this.gradeService.create(item)),
    );
    return result.map((item) => new CreateGradeResponse(item));
  }

  @Get()
  @Roles('admin', 'teacher')
  async findAll(): Promise<GradeResponse[]> {
    const result = await this.gradeService.findAll();
    return result.map((item) => new GradeResponse(item));
  }

  @Get(':id')
  @Roles('admin', 'teacher')
  async findOne(@Param('id') id: string): Promise<GradeResponse> {
    return new GradeResponse(await this.gradeService.findOne(id));
  }

  @Patch()
  @Roles('admin', 'teacher')
  async update(
    @Body() updateGradesDto: UpdateGradeDto[],
  ): Promise<UpdateGradeResponse[]> {
    const result = await Promise.all(
      updateGradesDto.map((item) => this.gradeService.update(item)),
    );
    return result.map((item) => new UpdateGradeResponse(item));
  }

  @Delete(':id')
  @Roles('admin', 'teacher')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.gradeService.remove(id);
  }

  @Get('student/:studentId')
  @Roles('student')
  async findByStudent(
    @Param('studentId') studentId: string,
  ): Promise<GetGradeByStudentResponse[]> {
    const result = await this.gradeService.findByStudent(studentId);
    return result.map((item) => new GetGradeByStudentResponse(item));
  }

  @Get('teacher/:teacherId')
  @Roles('admin', 'teacher')
  async findByTeacher(
    @Param('teacherId') teacherId: string,
  ): Promise<GetGradeByTeacherResponse[]> {
    const result = await this.gradeService.findByTeacher(teacherId);
    return result.map((item) => new GetGradeByTeacherResponse(item));
  }

  @Get('students/without-grades')
  @Roles('admin', 'teacher')
  findStudentsWithoutGrades() {
    return this.gradeService.findStudentsWithoutGrades();
  }
}
