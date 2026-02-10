import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthConfig } from '../configs/auth.config';
import { TypeConfigService } from '../configs/types.config.service';
import { User } from '../user/entity/user.entity';
import { UserService } from './user.service';
import { Role } from '../user/entity/role.entity';
import { AuthService } from './auth/auth.service';
import { PasswordService } from './password/password.service';
import { AuthController } from './auth/auth.controller';
import { TokenService } from './auth/token.service';
import { HashedPassword } from './entity/hashed-password.entity';
import { UserController } from './user.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../guard/user.guard';
import { RoleGuard } from '../guard/roles.guard';
import { PersonModule } from 'src/person/person.module';
import { StudentModule } from 'src/student/student.module';
import { RoleService } from './role/role.service';
import { FilterService } from './filter/filter.service';
import { UniversityModule } from 'src/university/university.module';
import { UserQueryService } from './user-query.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, HashedPassword, Role]),
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
    PersonModule,
    StudentModule,
    forwardRef(() => UniversityModule),
  ],
  providers: [
    UserService,
    PasswordService,
    AuthService,
    TokenService,
    AuthGuard,
    RoleGuard,
    TypeConfigService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
    RoleService,
    FilterService,
    UserQueryService,
  ],
  controllers: [UserController, AuthController],
  exports: [RoleService, UserService],
})
export class UserModule {}
