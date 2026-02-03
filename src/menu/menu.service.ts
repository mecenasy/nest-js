import { Injectable, NotFoundException } from '@nestjs/common';
import { AddMenuItemDto } from './dto/add-menu-item.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entity/menu.entity';
import { RoleService } from 'src/user/role/role.service';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
    private readonly roleService: RoleService,
  ) {}

  public async getMenu(role?: string): Promise<Menu[]> {
    const qr = this.menuRepository
      .createQueryBuilder('menu')
      .orderBy('menu.position', 'ASC');

    if (role) {
      qr.leftJoin('menu.role', 'role').where('role.name = :role', { role });
    } else {
      qr.leftJoinAndSelect('menu.role', 'role');
    }

    return await qr.getMany();
  }

  public async addMenuItem(menuDto: AddMenuItemDto): Promise<Menu> {
    const roles = await this.roleService.getRolesByName(menuDto.role);
    return this.menuRepository.save({ ...menuDto, role: roles });
  }

  public async removeMenuItem(id: string): Promise<void> {
    const menuItem = await this.menuRepository.findBy({ id });
    if (!menuItem) {
      throw new NotFoundException();
    }
    await this.menuRepository.remove(menuItem);
  }
}
