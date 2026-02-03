import { Injectable } from '@nestjs/common';
import { DirectionService } from 'src/university/direction/direction.service';
import { GroupService } from 'src/university/group/group.service';
import { SpecialtyService } from 'src/university/specialty/specialty.service';
import { YearService } from 'src/university/year/year.service';
import { RoleService } from '../role/role.service';
import { FilterRes } from '../response/user-list.response';

@Injectable()
export class FilterService {
  constructor(
    private readonly roleService: RoleService,
    private readonly directionService: DirectionService,
    private readonly specialtyService: SpecialtyService,
    private readonly groupService: GroupService,
    private readonly yearService: YearService,
  ) {}

  public async getFilters(): Promise<FilterRes> {
    const [directions, specialties, groups, years, roles] = await Promise.all([
      this.directionService.getDirections(),
      this.specialtyService.getSpecialties(),
      this.groupService.getGroups(),
      this.yearService.getAllYears(),
      this.roleService.getRoles(),
    ]);

    return {
      directions,
      specialties,
      groups,
      years,
      roles,
      orderBy: ['direction', 'specialty', 'group', 'year', 'role'],
      orderType: ['ASC', 'DESC'],
    };
  }
}
