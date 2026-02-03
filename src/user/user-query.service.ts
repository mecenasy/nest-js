import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { FilterService } from './filter/filter.service';
import { GetUsersParams } from './params/get-users.params';
import { ProfileResponse } from './response/profile.response';
import { PaginationRes, UserListResponse } from './response/user-list.response';
import { UniversityService } from 'src/university/university.service';

@Injectable()
export class UserQueryService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly filtersService: FilterService,
    private readonly universityService: UniversityService,
  ) {}

  public async getUsersByQuery(
    query: GetUsersParams,
    addAddress?: boolean,
  ): Promise<UserListResponse> {
    const [filters, [users, count], filtersMap] = await Promise.all([
      this.filtersService.getFilters(),
      this.getUsers(query, addAddress),
      this.universityService.getUniversityMap(),
    ]);
    const pagination = this.getPagination(query.pageSize, query.page, count);

    return {
      users: users.map((user) => new ProfileResponse(user)),
      pagination,
      filters,
      filtersMap,
    };
  }

  public async getUsers(
    query: GetUsersParams,
    addAddress?: boolean,
  ): Promise<[User[], number]> {
    const {
      page = 1,
      pageSize = 10,
      roles,
      directions,
      specialties,
      groups,
      years,
      orderType,
      orderBy,
    } = query;
    const qr = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.person', 'person')
      .leftJoinAndSelect('user.roles', 'roles')
      .leftJoinAndSelect('user.student', 'student')
      .offset((page - 1) * pageSize)
      .limit(pageSize)
      .addOrderBy(orderBy ? `student.${orderBy}` : 'user.email', orderType);
    if (addAddress) {
      qr.leftJoinAndSelect('person.address', 'address');
    }
    if (roles) {
      qr.andWhere('roles.name IN (:...roles)', { roles });
    }

    if (directions) {
      qr.andWhere('student.direction IN (:...directions)', { directions });
    }

    if (specialties) {
      qr.andWhere('student.specialty IN (:...specialties)', { specialties });
    }

    if (groups) {
      qr.andWhere('student.group IN (:...groups)', { groups });
    }

    if (years) {
      qr.andWhere('student.year IN (:...years)', { years });
    }

    return await qr.getManyAndCount();
  }

  public getPagination(
    pageSize: number,
    page: number,
    count: number,
  ): PaginationRes {
    return {
      currentPage: page,
      pageSize: pageSize,
      totalPages: Math.ceil(count / pageSize),
      totalItems: count,
    };
  }
}
