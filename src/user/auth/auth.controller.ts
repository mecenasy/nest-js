import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  SerializeOptions,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../dto/login.dto';
import { LoginResponse } from '../response/login.response';
import { Expose } from 'class-transformer';
import { Public } from '../../decorators/public.decorator';
import { UserService } from '../user.service';
import { CurrentUserId } from 'src/decorators/current-user-id.decorator';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ strategy: 'excludeAll' })
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Expose()
  public async loginUser(@Body() loginUser: LoginDto): Promise<LoginResponse> {
    const { email, password } = loginUser;
    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }

    const auth = await this.authService.login(email, password);

    return new LoginResponse(auth);
  }

  @Get('logout')
  public logout() {
    return { message: 'Logout successful' };
  }

  @Get('refreshtoken')
  public async refreshToken(@CurrentUserId() id: string) {
    const user = await this.userService.findUserById(id);

    if (!user) {
      throw new UnauthorizedException('you are not logged in');
    }

    const auth = await this.authService.refreshToken(id);

    return new LoginResponse(auth);
  }
}
