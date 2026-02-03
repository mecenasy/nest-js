import { Injectable } from '@nestjs/common';
import { Role } from '../entity/role.entity';
import { DataSource, In } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(private readonly dataSource: DataSource) {}

  public async getRolesByName(names: string[]): Promise<Role[]> {
    return await this.dataSource.getRepository(Role).findBy({
      name: In(names),
    });
  }

  public async getRoles(): Promise<string[]> {
    const roles = await this.dataSource
      .getRepository(Role)
      .createQueryBuilder('role')
      .select('json_agg(distinct role.name)', 'names')
      .getRawMany<{ names: string[] }>();

    return roles.map((role) => role.names).flat();
  }
}
