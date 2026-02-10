import { Module, forwardRef } from '@nestjs/common';
import { TimeTableService } from './time-table.service';
import { TimeTableController } from './time-table.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeTable } from './entity/time-table.entity';
import { UserModule } from 'src/user/user.module';
import { SubjectModule } from '../subject/subject.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TimeTable]),
    forwardRef(() => UserModule),
    SubjectModule,
  ],
  controllers: [TimeTableController],
  providers: [TimeTableService],
})
export class TimeTableModule {}
