import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  ClassSerializerInterceptor,
  UseInterceptors,
  SerializeOptions,
} from '@nestjs/common';
import { TimeTableService } from './time-table.service';
import { AddSubjectToTimeTableDto } from './dto/add-subject-to-time-table.dto';
import { MoveSubjectInTimeTableDto } from './dto/move-subject-in-time-table.dto';
import { GetByGroupParams } from './params/get-by-group.params';
import { RemoveSubjectFromTimeTableDto } from './dto/remove-subject-from-time-table.dto';
import { AddSubjectToTimeTableResponse } from './response/add-subject to time-table.response';
import { CalendarResponse } from './response/calendar.response';
import { GetTimeTableResponse } from './response/get-time-table.response';
import { GetTimeTableByGroupRes } from './response/get-time-table-by-group.response';
import { Roles } from 'src/decorators/role.decorator';

@Controller('university/time-table')
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ strategy: 'excludeAll' })
export class TimeTableController {
  constructor(private readonly timeTableService: TimeTableService) {}

  @Get('year/:year')
  @Roles('admin', 'teacher')
  public async getTimeTableByYear(
    @Param('year') year: string,
  ): Promise<GetTimeTableResponse[]> {
    const result = await this.timeTableService.getTimeTableByYear(year);
    return result.map((item) => new GetTimeTableResponse(item));
  }

  @Get('group/:groupId/year/:yearId')
  public async getTimeTableByGroup(
    @Param() { groupId, yearId }: GetByGroupParams,
  ): Promise<GetTimeTableResponse[]> {
    const result = await this.timeTableService.getTimeTableByGroup(
      groupId,
      yearId,
    );
    return [
      new GetTimeTableResponse({
        name: groupId,
        year: yearId,
        timeTable: result.map((item) => new GetTimeTableByGroupRes(item)),
      }),
    ];
  }
  @Get('calendar')
  public getCalendar(): CalendarResponse {
    return new CalendarResponse(this.timeTableService.getCalendar());
  }

  @Get('specialty/:specialtyId')
  public async getTimeTableBySpecialty(
    @Param('specialtyId') specialtyId: string,
  ): Promise<GetTimeTableResponse[]> {
    const result =
      await this.timeTableService.getTimeTableBySpecialty(specialtyId);
    return result.map((item) => new GetTimeTableResponse(item));
  }

  @Get('teacher/:teacherId')
  @Roles('admin', 'teacher')
  public async getTimeTableByTeacher(@Param('teacherId') teacherId: string) {
    return await this.timeTableService.getTimeTableByTeacher(teacherId);
  }

  @Post()
  @Roles('admin')
  public async addSubjectToTimeTable(
    @Body() dto: AddSubjectToTimeTableDto,
  ): Promise<AddSubjectToTimeTableResponse> {
    return new AddSubjectToTimeTableResponse(
      await this.timeTableService.addSubjectToTimeTable(dto),
    );
  }

  @Delete()
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async removeSubjectFromTimeTable(
    @Body() dto: RemoveSubjectFromTimeTableDto,
  ) {
    return await this.timeTableService.removeSubjectFromTimeTable(dto);
  }

  @Patch()
  @Roles('admin')
  public async moveSubjectInTimeTable(
    @Body() dto: MoveSubjectInTimeTableDto,
  ): Promise<AddSubjectToTimeTableResponse> {
    return new AddSubjectToTimeTableResponse(
      await this.timeTableService.moveSubjectInTimeTable(dto),
    );
  }
}
