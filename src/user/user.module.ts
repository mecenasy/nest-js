import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthConfig } from 'src/configs/auth.config';
import { TypeConfigService } from 'src/configs/types.config.service';
import { User } from 'src/user/entity/user.entity';
import { UserService } from './user.service';
import { AuthService } from './auth/auth.service';
import { PasswordService } from './password/password.service';
import { UserController } from './auth/user.controller';
import { TokenService } from './auth/token.service';
import { HashedPassword } from './entity/hashed-password.entity';
import { AuthGuard } from './auth/user.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, HashedPassword]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: TypeConfigService) => ({
        secret: config.get<AuthConfig>('auth')?.jwt.secretKey,
        signOptions: {
          expiresIn: config.get<AuthConfig>('auth')?.jwt.expireAt,
        },
      }),
    }),
  ],
  providers: [
    UserService,
    PasswordService,
    AuthService,
    TokenService,
    AuthGuard,
  ],
  controllers: [UserController],
})
export class UserModule {}
