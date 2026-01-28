import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../dto/login.dto';
import { LoginResponse } from '../response/login.response';
import { Expose } from 'class-transformer';
import { Public } from '../../decorators/public.decorator';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ strategy: 'excludeAll' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Expose()
  public async loginUser(@Body() loginUser: LoginDto): Promise<LoginResponse> {
    const { email, password } = loginUser;
    const token = await this.authService.login(email, password);

    return new LoginResponse({ token });
  }

  @Get('logout')
  @Public()
  public logout() {
    return { message: 'Logout successful' };
  }
}
