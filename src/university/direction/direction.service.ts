import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, EntityManager, EntityTarget } from 'typeorm';
import { Direction } from '../entity/direction.entity';
import { CreateDirectionDto } from '../dto/create-direction.dto';
import { YearService } from '../year/year.service';
import { IDto } from '../model/dto.model';
import { DirectionRes } from '../response/university-map.response';
import { SpecialtyService } from '../specialty/specialty.service';

@Injectable()
export class DirectionService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly specialtyService: SpecialtyService,
    private readonly yearService: YearService,
  ) {}

  public async createDirection(dto: CreateDirectionDto): Promise<void> {
    if (await this.getEntity(dto, Direction)) {
      const { specialties } = dto;
      await Promise.all(
        specialties.map((specialty) =>
          this.specialtyService.createSpecialty({
            ...specialty,
            direction: dto.name,
          }),
        ),
      );
      return;
    }
    await this.dataSource.transaction(async (manager) => {
      const direction = await this.directionTree(dto, manager);
      await manager.save(direction);
    });
  }
  public async getDirections(): Promise<string[]> {
    const specialties = await this.dataSource
      .getRepository(Direction)
      .createQueryBuilder('direction')
      .select('json_agg(distinct direction.name)', 'names')
      .getRawMany<{ names: string[] }>();

    return specialties.map((specialty) => specialty.names).flat();
  }

  public async getDirectionsMap(): Promise<DirectionRes[]> {
    return await this.dataSource
      .getRepository(Direction)
      .createQueryBuilder('direction')
      .leftJoin('direction.years', 'year')
      .leftJoin('direction.specialties', 'specialty')
      .select('direction.name', 'name')
      .addSelect('json_agg(distinct specialty.name)', 'specialties')
      .addSelect('json_agg(distinct year.name)', 'years')
      .groupBy('direction.name')
      .getRawMany<DirectionRes>();
  }

  private async directionTree(
    { name, specialties, years }: CreateDirectionDto,
    manager: EntityManager,
  ) {
    return manager.create(Direction, {
      name,
      years: await this.yearService.getYears(years),
      specialties: await Promise.all(
        specialties.map((specialty) =>
          this.specialtyService.specialtiesTree(specialty, manager),
        ),
      ),
    });
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
