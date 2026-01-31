import { registerAs } from '@nestjs/config';

export interface AppConfig {
  port: number;
  appMessage: string;
  appUrl: string;
}

export const appConfig = registerAs(
  'app',
  (): AppConfig => ({
    port: parseInt(process.env.PORT || '3000'),
    appMessage: process.env.APP_MESSAGE || 'Hello',
    appUrl: process.env.APP_URL || '',
  }),
);
