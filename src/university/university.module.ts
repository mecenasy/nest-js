import { Module, forwardRef } from '@nestjs/common';
import { UniversityService } from './university.service';
import { DirectionService } from './direction/direction.service';
import { GroupService } from './group/group.service';
import { YearService } from './year/year.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Direction } from './entity/direction.entity';
import { Specialty } from './entity/specialty.entity';
import { Group } from './entity/group.entity';
import { Year } from './entity/year.entity';
import { UniversityController } from './university.controller';
import { SpecialtyService } from './specialty/specialty.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Direction, Specialty, Group, Year]),
    forwardRef(() => UserModule),
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
