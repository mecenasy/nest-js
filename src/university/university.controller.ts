import { Controller, Post, Body } from '@nestjs/common';
import { UniversityService } from './university.service';
import { CreateDirectionDto } from './dto/create-direction.dto';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { CreateYearDto } from './dto/create-year.dto';

@Controller('university')
export class UniversityController {
  constructor(private readonly universityService: UniversityService) {}

  @Post('direction')
  public createDirection(@Body() dto: CreateDirectionDto) {
    return this.universityService.createDirection(dto);
  }

  @Post('specialty')
  public async createSpecialty(@Body() dto: CreateSpecialtyDto) {
    return this.universityService.createSpecialty(dto);
  }

  @Post('group')
  public async createGroup(@Body() dto: CreateGroupDto) {
    return this.universityService.createGroup(dto);
  }
  @Post('year')
  public async createYear(@Body() dto: CreateYearDto) {
    return this.universityService.createYear(dto);
  }
}
