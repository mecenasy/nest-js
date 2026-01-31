import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user.service';
import { PasswordService } from '../password/password.service';
import { TokenService } from './token.service';
import { TypeConfigService } from 'src/configs/types.config.service';
import { AuthConfig } from 'src/configs/auth.config';
import { AuthRes, LoginResponse } from '../response/login.response';
import ms from 'ms';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly passwordService: PasswordService,
    private readonly configService: TypeConfigService,
  ) {}

  public async login(email: string, password: string): Promise<LoginResponse> {
    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!this.passwordService.validatePassword(password, user.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const expireAt = this.configService.get<AuthConfig>('auth')?.jwt
      .expireAt as ms.StringValue;

    const token = await this.tokenService.generateToken(user, expireAt);

    const auth: AuthRes = { token, expireAt };
    return {
      auth,
      user: {
        name: user.person?.name,
        userId: user.id,
        role: user.roles[0].name,
        isDefaultPassword: user.createTime === user.updateTime,
      },
    };
  }

  public async refreshToken(id: string): Promise<LoginResponse> {
    const user = await this.userService.findUserById(id);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const expireAt = this.configService.get<AuthConfig>('auth')?.jwt
      .expireAt as ms.StringValue;

    const token = await this.tokenService.generateToken(user, expireAt);

    const auth: AuthRes = { token, expireAt };
    return {
      auth,
      user: {
        name: user.person?.name,
        userId: user.id,
        role: user.roles[0].name,
        isDefaultPassword: user.createTime === user.updateTime,
      },
    };
  }
}
