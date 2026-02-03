import {
  IsArray,
  // IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { IMenu, MenuSide } from '../model/menu.model';
import { Transform } from 'class-transformer';
import { splitElementByComa } from 'src/decorators/helper/split-element-by-coma';

export class AddMenuItemDto implements Omit<IMenu, 'role'> {
  @IsOptional()
  @IsBoolean()
  hidden?: boolean | undefined;

  @IsOptional()
  @IsString()
  image?: string | undefined;

  @IsString()
  @IsNotEmpty()
  link: string;

  @IsNotEmpty()
  @IsEnum(MenuSide)
  menuSide: MenuSide;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  position: number;

  @IsString()
  @IsNotEmpty()
  shortName: string;

  @IsArray()
  // @IsString({ each: true })
  @IsNotEmpty()
  @Transform(splitElementByComa)
  role: string[];
}
