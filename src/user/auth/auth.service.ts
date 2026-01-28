import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user.service';
import { PasswordService } from '../password/password.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly passwordService: PasswordService,
  ) {}

  public async login(email: string, password: string): Promise<string> {
    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!this.passwordService.validatePassword(password, user.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.tokenService.generateToken(user);
  }
}
