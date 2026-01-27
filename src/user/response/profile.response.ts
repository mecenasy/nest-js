import { Expose } from 'class-transformer';

export class ProfileResponse {
  constructor(private readonly partial?: Partial<ProfileResponse>) {
    Object.assign(this, partial);
  }
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;
}
