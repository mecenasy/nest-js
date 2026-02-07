import { Injectable } from '@nestjs/common';
import { UniversityMapResponse } from './response/university-map.response';
import { RoleService } from 'src/user/role/role.service';
import { DirectionService } from './direction/direction.service';
import { YearService } from './year/year.service';
import { CreateDirectionDto } from './dto/create-direction.dto';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { CreateYearDto } from './dto/create-year.dto';
import { SpecialtyService } from './specialty/specialty.service';
import { GroupService } from './group/group.service';

@Injectable()
export class UniversityService {
  constructor(
    private readonly roleService: RoleService,
    private readonly directionService: DirectionService,
    private readonly specialtyService: SpecialtyService,
    private readonly groupService: GroupService,
    private readonly yearService: YearService,
  ) {}

  public async getRoles(): Promise<string[]> {
    return await this.roleService.getRoles();
  }

  public async getUniversityMap(): Promise<UniversityMapResponse> {
    const [directions, specialties, group, years, roles] = await Promise.all([
      this.directionService.getDirectionsMap(),
      this.specialtyService.getSpecialtiesMap(),
      this.groupService.getGroupsMap(),
      this.yearService.getYearsMap(),
      this.roleService.getRoles(),
    ]);

    return {
      directions,
      specialties,
      group,
      years,
      roles,
    };
  }

  public async createDirection(dto: CreateDirectionDto) {
    return await this.directionService.createDirection(dto);
  }

  public async createSpecialty(dto: CreateSpecialtyDto) {
    return await this.specialtyService.createSpecialty(dto);
  }

  public async createGroup(dto: CreateGroupDto) {
    return await this.groupService.createGroup(dto);
  }

  public async createYear(dto: CreateYearDto) {
    return await this.yearService.createYear(dto);
  }
}
