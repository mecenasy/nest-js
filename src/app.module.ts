import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig } from './configs/app.config';
import { configSchema } from './configs/config.types';
import { typeOrmConfig } from './configs/db.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeConfigService } from './configs/types.config.service';
import { authConfig } from './configs/auth.config';
import { UserModule } from './user/user.module';
import { UniversityModule } from './university/university.module';
import { MenuModule } from './menu/menu.module';
import { StudentModule } from './student/student.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FileModule } from './file/file.module';
import { MessageModule } from './message/message.module';
import { NotificationModule } from './notification/notification.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: TypeConfigService) => ({
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        ...configService.get('db'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'assets'),
      serveRoot: '/static',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, typeOrmConfig, authConfig],
      validationSchema: configSchema,
      validationOptions: {
        abortEarly: true,
      },
    }),
    EventEmitterModule.forRoot({
      global: true,
    }),
    TasksModule,
    UserModule,
    MenuModule,
    UniversityModule,
    StudentModule,
    FileModule,
    MessageModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: TypeConfigService,
      useExisting: ConfigService,
    },
  ],
})
export class AppModule {}
