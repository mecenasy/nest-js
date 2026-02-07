import { Module } from '@nestjs/common';
import { TimeTableController } from './time-table.controller';
import { TimeTableService } from './time-table.service';

@Module({
  controllers: [TimeTableController],
  providers: [TimeTableService],
})
export class TimeTableModule {}
