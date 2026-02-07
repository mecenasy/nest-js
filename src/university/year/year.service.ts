import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, EntityTarget } from 'typeorm';
import { CreateYearDto } from '../dto/create-year.dto';
import { Specialty } from '../specialty/entity/specialty.entity';
import { IDto } from '../model/dto.model';
import { YearRes } from '../response/university-map.response';
import { Year } from './entity/year.entity';
import { Direction } from '../direction/entity/direction.entity';
import { Group } from '../group/entity/group.entity';

@Injectable()
export class YearService {
  constructor(private readonly dataSource: DataSource) {}

  public async createYear(dto: CreateYearDto): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      let year: Year | null = (await this.getEntity(dto, Year)) as Year;

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

  public async getYears(names: string[]) {
    return await this.dataSource
      .getRepository(Year)
      .createQueryBuilder('year')
      .where('year.name IN (:...names)', { names })
      .getMany();
  }

  public async getYearsMap(): Promise<YearRes[]> {
    return await this.dataSource
      .getRepository(Year)
      .createQueryBuilder('year')
      .leftJoin('year.directions', 'direction')
      .leftJoin('year.specialties', 'specialty')
      .leftJoin('year.group', 'group')
      .select('year.name', 'name')
      .addSelect('json_agg(distinct direction.name)', 'directions')
      .addSelect('json_agg(distinct specialty.name)', 'specialties')
      .addSelect('json_agg(distinct group.name)', 'groups')
      .groupBy('year.name')
      .getRawMany<YearRes>();
  }

  public async getAllYears(): Promise<string[]> {
    const years = await this.dataSource
      .getRepository(Year)
      .createQueryBuilder('year')
      .select('json_agg(distinct year.name)', 'names')
      .getRawMany<{ names: string[] }>();

    return years.map((year) => year.names).flat();
  }

  private async getDirectionsByGroupNames(names: string[]) {
    return await this.dataSource
      .getRepository(Direction)
      .createQueryBuilder('direction')
      .leftJoinAndSelect('direction.years', 'year')
      .innerJoin('direction.specialties', 'specialty')
      .innerJoin('specialty.groups', 'group')
      .where('group.name IN (:...names)', { names })
      .getMany();
  }

  private async getSpecialtiesBygGroupNames(names: string[]) {
    return await this.dataSource
      .getRepository(Specialty)
      .createQueryBuilder('specialty')
      .leftJoinAndSelect('specialty.years', 'year')
      .innerJoin('specialty.groups', 'group')
      .where('group.name IN (:...names)', { names })
      .getMany();
  }

  private async getGroups(names: string[]) {
    return await this.dataSource
      .getRepository(Group)
      .createQueryBuilder('group')
      .leftJoinAndSelect('group.years', 'year')
      .where('group.name IN (:...names)', { names })
      .getMany();
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
