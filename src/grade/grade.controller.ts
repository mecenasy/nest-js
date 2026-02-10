import {
  Body,
  // ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  // SerializeOptions,
  // UseInterceptors,
} from '@nestjs/common';
import { GradeService } from './grade.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { Roles } from 'src/decorators/role.decorator';

@Controller('grade')
// @UseInterceptors(ClassSerializerInterceptor)npm run
export class GradeController {
  constructor(private readonly gradeService: GradeService) {}

  @Post()
  create(@Body() dto: CreateGradeDto) {
    return this.gradeService.create(dto);
  }

  @Get()
  @Roles('admin', 'teacher')
  findAll() {
    return this.gradeService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'teacher')
  findOne(@Param('id') id: string) {
    return this.gradeService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin', 'teacher')
  update(@Param('id') id: string, @Body() updateGradeDto: UpdateGradeDto) {
    return this.gradeService.update(id, updateGradeDto);
  }

  @Delete(':id')
  @Roles('admin', 'teacher')
  remove(@Param('id') id: string) {
    return this.gradeService.remove(id);
  }

  @Get('student/:studentId')
  @Roles('admin', 'teacher', 'student')
  findByStudent(@Param('studentId') studentId: string) {
    return this.gradeService.findByStudent(studentId);
  }

  @Get('teacher/:teacherId')
  @Roles('admin', 'teacher')
  findByTeacher(@Param('teacherId') teacherId: string) {
    return this.gradeService.findByTeacher(teacherId);
  }
}
