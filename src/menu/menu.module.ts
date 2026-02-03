import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entity/menu.entity';
import { Role } from 'src/user/entity/role.entity';
import { TypeConfigService } from 'src/configs/types.config.service';
import { ConfigService } from '@nestjs/config';
import { RoleService } from 'src/user/role/role.service';

@Module({
  imports: [TypeOrmModule.forFeature([Menu, Role])],
  providers: [
    RoleService,
    MenuService,
    {
      provide: TypeConfigService,
      useExisting: ConfigService,
    },
  ],
  controllers: [MenuController],
})
export class MenuModule {}
