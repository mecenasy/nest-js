import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, EntityManager, EntityTarget } from 'typeorm';
import { Group } from '../entity/group.entity';
import { CreateGroupDto } from '../dto/create-group.dto';
import { CreateGroup } from '../dto/create-direction.dto';
import { YearService } from '../year/year.service';
import { Specialty } from '../entity/specialty.entity';
import { IDto } from '../model/dto.model';
import { GroupRes } from '../response/university-map.response';

@Injectable()
export class GroupService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly yearService: YearService,
  ) {}

  public async createGroup(dto: CreateGroupDto): Promise<void> {
    if (await this.getEntity(dto, Group)) {
      throw new BadRequestException('group already exist');
    }

    await this.dataSource.transaction(async (manager) => {
      const group = await this.findByName<Specialty>(
        dto.specialty,
        'groups',
        Specialty,
      );
      group.groups.push(await this.groupsTree(dto, manager));
      await manager.save(group);
    });
  }

  public async getGroupsMap(): Promise<GroupRes[]> {
    return await this.dataSource
      .getRepository(Group)
      .createQueryBuilder('group')
      .leftJoin('group.specialty', 'specialty')
      .leftJoin('group.years', 'year')
      .select('group.name', 'name')
      .addSelect('specialty.name', 'specialty')
      .addSelect('json_agg(distinct year.name)', 'years')
      .groupBy('group.name')
      .addGroupBy('specialty.name')
      .getRawMany<GroupRes>();
  }

  public async getGroups(): Promise<string[]> {
    const groups = await this.dataSource
      .getRepository(Group)
      .createQueryBuilder('group')
      .select('json_agg(distinct group.name)', 'names')
      .getRawMany<{ names: string[] }>();

    return groups.map((group) => group.names).flat();
  }

  public async groupsTree(
    { name, years }: CreateGroup,
    manager: EntityManager,
  ) {
    return manager.create(Group, {
      name,
      years: await this.yearService.getYears(years),
    });
  }

  private async findByName<T extends IDto>(
    name: string,
    relationName: string,
    entityModel: EntityTarget<T>,
  ): Promise<T> {
    const entity = await this.dataSource
      .getRepository(entityModel)
      .createQueryBuilder('e')
      .leftJoinAndSelect(`e.${relationName}`, 'd')
      .where('e.name = :name', { name })
      .getOne();

    if (!entity) {
      throw new BadRequestException('entity already not exist');
    }

    return entity;
  }

  private async getEntity<R extends IDto>(
    dto: IDto,
    entityModel: EntityTarget<R>,
  ): Promise<IDto | null> {
    if (!dto) {
      throw new BadRequestException('dto is required');
    }

    return await this.dataSource
      .getRepository(entityModel)
      .createQueryBuilder('e')
      .where('e.name = :name', { name: dto.name })
      .getOne();
  }
}
