import { Module } from '@nestjs/common';
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

@Module({
  imports: [TypeOrmModule.forFeature([Direction, Specialty, Group, Year])],
  controllers: [UniversityController],
  providers: [UniversityService, DirectionService, GroupService, YearService],
})
export class UniversityModule {}
