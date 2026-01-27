import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { PasswordService } from '../password/password.service';
import { IUser } from '../model/user.model';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly passwordService: PasswordService,
  ) {}

  public async register(registerUser: CreateUserDto): Promise<IUser> {
    const existingUser = await this.userService.findUserByEmail(
      registerUser.email,
    );

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    return await this.userService.createUser(registerUser);
  }

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
