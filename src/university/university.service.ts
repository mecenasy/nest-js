import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Direction } from './entity/direction.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Specialty } from './entity/specialty.entity';
import { Group } from './entity/group.entity';
import { Year } from './entity/year.entity';
import {
  CreateDirectionDto,
  CreateGroup,
  CreateSpecialty,
} from './dto/create-direction.dto';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { CreateYearDto } from './dto/create-year.dto';
import { IDto } from './model/dto.model';

@Injectable()
export class UniversityService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Direction)
    private readonly directionRepository: Repository<Direction>,
    @InjectRepository(Specialty)
    private readonly specialtyRepository: Repository<Specialty>,
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(Year)
    private readonly yearRepository: Repository<Year>,
  ) {}

  public async createDirection(dto: CreateDirectionDto): Promise<void> {
    if (await this.getEntity(dto, this.directionRepository)) {
      const { specialties } = dto;
      await Promise.all(
        specialties.map((specialty) =>
          this.createSpecialty({ ...specialty, direction: dto.name }),
        ),
      );
      return;
    }
    await this.dataSource.transaction(async (manager) => {
      const direction = await this.directionTree(dto, manager);
      await manager.save(direction);
    });
  }

  public async createSpecialty(dto: CreateSpecialtyDto): Promise<void> {
    if (await this.getEntity(dto, this.specialtyRepository)) {
      const { groups } = dto;
      await Promise.all(
        groups.map((group) =>
          this.createGroup({ ...group, specialty: dto.name }),
        ),
      );
      return;
    }

    await this.dataSource.transaction(async (manager) => {
      const direction = await this.findByName<Direction>(
        dto.direction,
        this.directionRepository,
        'specialties',
      );

      direction.specialties.push(await this.specialtiesTree(dto, manager));
      await manager.save(direction);
    });
  }

  public async createGroup(dto: CreateGroupDto): Promise<void> {
    if (await this.getEntity(dto, this.specialtyRepository)) {
      throw new BadRequestException('group already exist');
    }

    await this.dataSource.transaction(async (manager) => {
      const group = await this.findByName<Specialty>(
        dto.specialty,
        this.specialtyRepository,
        'groups',
      );
      group.groups.push(await this.groupsTree(dto, manager));
      await manager.save(group);
    });
  }

  private async directionTree(
    { name, specialties, years }: CreateDirectionDto,
    manager: EntityManager,
  ) {
    return manager.create(Direction, {
      name,
      years: await this.getYears(years),
      specialties: await Promise.all(
        specialties.map((specialty) =>
          this.specialtiesTree(specialty, manager),
        ),
      ),
    });
  }

  private async specialtiesTree(
    { groups, name, years }: CreateSpecialty,
    manager: EntityManager,
  ) {
    return manager.create(Specialty, {
      name,
      years: await this.getYears(years),
      groups: await Promise.all(
        groups.map((group) => this.groupsTree(group, manager)),
      ),
    });
  }
  private async groupsTree(
    { name, years }: CreateGroup,
    manager: EntityManager,
  ) {
    return manager.create(Group, {
      name,
      years: await this.getYears(years),
    });
  }

  private async getYears(names: string[]) {
    return await this.yearRepository
      .createQueryBuilder('year')
      .where('year.name IN (:...names)', { names })
      .getMany();
  }

  private async getDirectionsByGroupNames(names: string[]) {
    return await this.directionRepository
      .createQueryBuilder('direction')
      .leftJoinAndSelect('direction.years', 'year')
      .innerJoin('direction.specialties', 'specialty')
      .innerJoin('specialty.groups', 'group')
      .where('group.name IN (:...names)', { names })
      .getMany();
  }

  private async getSpecialtiesBygGroupNames(names: string[]) {
    return await this.specialtyRepository
      .createQueryBuilder('specialty')
      .leftJoinAndSelect('specialty.years', 'year')
      .innerJoin('specialty.groups', 'group')
      .where('group.name IN (:...names)', { names })
      .getMany();
  }
  private async getGroups(names: string[]) {
    return await this.groupRepository
      .createQueryBuilder('group')
      .leftJoinAndSelect('group.years', 'year')
      .where('group.name IN (:...names)', { names })
      .getMany();
  }

  public async createYear(dto: CreateYearDto): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      let year: Year | null = (await this.getEntity(
        dto,
        this.yearRepository,
      )) as Year;

      if (!year) {
        year = manager.create(Year, { name: dto.name });
      }
      const [directions, specialties, groups] = await Promise.all([
        this.getDirectionsByGroupNames(dto.groups),
        this.getSpecialtiesBygGroupNames(dto.groups),
        this.getGroups(dto.groups),
      ]);

      directions.forEach((direction) => {
        direction.years.push(year);
      });
      groups.forEach((group) => {
        group.years.push(year);
      });
      specialties.forEach((specialty) => {
        specialty.years.push(year);
      });
      await Promise.all([
        manager.save(year),
        manager.save(groups),
        manager.save(specialties),
        manager.save(directions),
      ]);
    });
  }

  private async findByName<T extends IDto>(
    name: string,
    repository: Repository<T>,
    relationName: string,
  ): Promise<T> {
    const entity = await repository.findOne({
      where: { name },
      relations: {
        [relationName]: true,
      },
    } as any);

    if (!entity) {
      throw new BadRequestException('entity already not exist');
    }

    return entity;
  }

  private async getEntity<R extends Repository<IDto>>(
    dto: IDto,
    repository: R,
  ): Promise<IDto | null> {
    if (!dto) {
      throw new BadRequestException('dto is required');
    }

    return await repository.findOneBy({ name: dto.name });
  }
}
