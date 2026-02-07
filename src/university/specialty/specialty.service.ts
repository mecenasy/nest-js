import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, EntityManager, EntityTarget } from 'typeorm';
import { Specialty } from './entity/specialty.entity';
import { CreateSpecialtyDto } from '../dto/create-specialty.dto';
import { CreateSpecialty } from '../dto/create-direction.dto';
import { YearService } from '../year/year.service';
import { IDto } from '../model/dto.model';
import { SpecialtyRes } from '../response/university-map.response';
import { GroupService } from '../group/group.service';
import { Direction } from '../direction/entity/direction.entity';

@Injectable()
export class SpecialtyService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly groupService: GroupService,
    private readonly yearService: YearService,
  ) {}

  public async createSpecialty(dto: CreateSpecialtyDto): Promise<void> {
    if (await this.getEntity(dto, Specialty)) {
      const { groups } = dto;
      await Promise.all(
        groups.map((group) =>
          this.groupService.createGroup({ ...group, specialty: dto.name }),
        ),
      );
      return;
    }

    await this.dataSource.transaction(async (manager) => {
      const direction = await this.findByName<Direction>(
        dto.direction,
        'specialties',
        Direction,
      );

      direction.specialties.push(await this.specialtiesTree(dto, manager));
      await manager.save(direction);
    });
  }

  public async getSpecialtiesMap(): Promise<SpecialtyRes[]> {
    return await this.dataSource
      .getRepository(Specialty)
      .createQueryBuilder('specialty')
      .leftJoin('specialty.direction', 'direction')
      .leftJoin('specialty.years', 'year')
      .leftJoin('specialty.groups', 'group')
      .select('specialty.name', 'name')
      .addSelect('direction.name', 'direction')
      .addSelect('json_agg(distinct group.name)', 'groups')
      .addSelect('json_agg(distinct year.name)', 'years')
      .groupBy('specialty.name')
      .addGroupBy('direction.name')
      .getRawMany<SpecialtyRes>();
  }

  public async getSpecialties(): Promise<string[]> {
    const specialties = await this.dataSource
      .getRepository(Specialty)
      .createQueryBuilder('specialty')
      .select('json_agg(distinct specialty.name)', 'names')
      .getRawMany<{ names: string[] }>();

    return specialties.map((specialty) => specialty.names).flat();
  }

  public async specialtiesTree(
    { groups, name, years }: CreateSpecialty,
    manager: EntityManager,
  ) {
    return manager.create(Specialty, {
      name,
      years: await this.yearService.getYears(years),
      groups: await Promise.all(
        groups.map((group) => this.groupService.groupsTree(group, manager)),
      ),
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
