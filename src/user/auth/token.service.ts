import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../model/user.model';
// import fs from 'fs/promises';
// import path from 'path';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  public async generateToken(user: IUser): Promise<string> {
    const payload = {
      sub: user.id,
      email: user.email,
    };
    // const privKey = await fs.readFile(path.join(__dirname, 'rsa_priv.pem'));

    // return this.jwtService.signAsync(payload, { secret: privKey });
    return this.jwtService.signAsync(payload);
  }
}
