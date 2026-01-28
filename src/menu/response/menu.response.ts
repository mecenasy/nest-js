import { Expose } from 'class-transformer';
import { IMenu, MenuSide } from '../model/menu.model';

export class MenuResponse implements Omit<IMenu, 'role'> {
  constructor(private readonly partial?: Partial<MenuResponse>) {
    Object.assign(this, partial);
  }

  @Expose()
  name: string;

  @Expose()
  shortName?: string;

  @Expose()
  menuSide: MenuSide;

  @Expose()
  position: number;

  @Expose()
  hidden?: boolean;

  @Expose()
  link: string;

  @Expose()
  image: string;
}
