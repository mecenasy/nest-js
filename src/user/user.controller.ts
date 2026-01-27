import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { IUser } from './model/user.model';
import { LoginResponse } from './login.response';

@Controller('user')
export class UserController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async registerUser(
    @Body() registerUser: CreateUserDto,
  ): Promise<IUser> {
    return await this.authService.register(registerUser);
  }

  @Post('login')
  public async loginUser(@Body() loginUser: LoginDto): Promise<LoginResponse> {
    const { email, password } = loginUser;
    const token = await this.authService.login(email, password);
    return { token };
  }

  @Get('logout')
  public logout() {
    return { message: 'Logout successful' };
  }
}
