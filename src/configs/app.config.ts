import { registerAs } from '@nestjs/config';

export interface AppConfig {
  port: number | undefined;
  appMessage: string;
  appUrl: string;
}

export const appConfig = registerAs(
  'app',
  (): AppConfig => ({
    port: process.env.HOST_PORT
      ? parseInt(process.env.HOST_PORT ?? '')
      : undefined,
    appMessage: process.env.APP_MESSAGE || 'Hello',
    appUrl: process.env.APP_URL || '',
  }),
);
