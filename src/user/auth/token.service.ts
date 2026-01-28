import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../model/user.model';
import { ConfigService } from '@nestjs/config';
import { AuthConfig } from '../../configs/auth.config';
// import fs from 'fs/promises';
// import path from 'path';

interface ITokenPayload {
  sub: string;
  email: string;
}

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async generateToken(user: IUser): Promise<string> {
    const payload: ITokenPayload = {
      sub: user.id,
      email: user.email,
    };
    // const privKey = await fs.readFile(path.join(__dirname, 'rsa_priv.pem'));

    // return this.jwtService.signAsync(payload, { secret: privKey });
    return this.jwtService.signAsync(payload);
  }

  public async verifyToken(token: string): Promise<ITokenPayload> {
    const payload = await this.jwtService.verifyAsync<ITokenPayload>(token, {
      secret: this.configService.get<AuthConfig>('auth')?.jwt.secretKey,
    });
    return payload;
  }
}
