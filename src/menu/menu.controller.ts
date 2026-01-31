import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  SerializeOptions,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Roles } from 'src/decorators/role.decorator';
import { UserRoleId } from 'src/decorators/user-role.decorator';
import { MenuService } from './menu.service';
import { AddMenuItemDto } from './dto/add-menu-item.dto';
import { Menu } from './entity/menu.entity';
import { MenuResponse } from './response/menu.response';
import { AssetsInterceptor } from 'src/interceptors/asset.interceptor';
import { File } from 'src/interceptors/fie.interceptor';

@Controller('menu')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(AssetsInterceptor)
@SerializeOptions({ strategy: 'excludeAll' })
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  public async getMenu(@UserRoleId() role: string): Promise<MenuResponse[]> {
    const menus = await this.menuService.getMenu(role);
    return menus.map((menu) => new MenuResponse(menu));
  }

  @Post()
  @Roles('admin')
  @UseInterceptors(File)
  public async addMenuItem(
    @Body() menuDto: AddMenuItemDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Menu> {
    if (file) {
      menuDto.image = file.filename;
    }

    return await this.menuService.addMenuItem(menuDto);
  }
}
