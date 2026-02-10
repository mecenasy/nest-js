import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  SerializeOptions,
} from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { SubjectService } from './subject.service';
import { SubjectResponse } from './response/subjects.response';
import { Roles } from 'src/decorators/role.decorator';

@Controller('university/subject')
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ strategy: 'excludeAll' })
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post()
  @Roles('admin')
  public async createSubject(
    @Body() createSubjectDto: CreateSubjectDto,
  ): Promise<SubjectResponse> {
    return new SubjectResponse(
      await this.subjectService.createSubject(createSubjectDto),
    );
  }

  @Get()
  @Roles('admin')
  public async getSubjects(): Promise<SubjectResponse[]> {
    const subjects = await this.subjectService.getSubjects();
    return subjects.map((subject) => new SubjectResponse(subject));
  }

  @Get('teacher/:teacherId')
  @Roles('admin', 'teacher')
  public async getSubjectsByTeacher(
    @Param('teacherId') teacherId: string,
  ): Promise<SubjectResponse[]> {
    const subjects = await this.subjectService.getSubjectsByTeacher(teacherId);
    return subjects.map((subject) => new SubjectResponse(subject));
  }

  @Get(':id')
  @Roles('admin')
  public async getSubjectById(
    @Param('id') id: string,
  ): Promise<SubjectResponse> {
    return new SubjectResponse(await this.subjectService.getSubjectById(id));
  }

  @Patch(':id')
  @Roles('admin')
  public async updateSubject(
    @Param('id') id: string,
    @Body() updateSubjectDto: UpdateSubjectDto,
  ) {
    return new SubjectResponse(
      await this.subjectService.updateSubject(id, updateSubjectDto),
    );
  }
}
