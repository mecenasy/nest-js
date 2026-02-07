import { Module, forwardRef } from '@nestjs/common';
import { UniversityService } from './university.service';
import { DirectionService } from './direction/direction.service';
import { YearService } from './year/year.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specialty } from './specialty/entity/specialty.entity';
import { UniversityController } from './university.controller';
import { SpecialtyService } from './specialty/specialty.service';
import { UserModule } from '../user/user.module';
import { Subject } from './subject/entity/subject.entity';
import { SubjectModule } from './subject/subject.module';
import { TimeTableModule } from './time-table/time-table.module';
import { Direction } from './direction/entity/direction.entity';
import { Group } from './group/entity/group.entity';
import { Year } from './year/entity/year.entity';
import { GroupService } from './group/group.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Direction, Specialty, Group, Year, Subject]),
    forwardRef(() => UserModule),
    SubjectModule,
    TimeTableModule,
  ],
  controllers: [UniversityController],
  providers: [
    UniversityService,
    DirectionService,
    GroupService,
    YearService,
    SpecialtyService,
  ],
  exports: [
    UniversityService,
    DirectionService,
    GroupService,
    YearService,
    SpecialtyService,
  ],
})
export class UniversityModule {}
