import { registerAs } from '@nestjs/config';
import ms from 'ms';

export interface AuthConfig {
  jwt: {
    secretKey: string;
    expireAt: ms.StringValue;
  };
}

export const authConfig = registerAs(
  'auth',
  (): AuthConfig => ({
    jwt: {
      secretKey: process.env.JWT_SECRET_KEY as string,
      expireAt: process.env.JWT_EXPIRE_AT as ms.StringValue,
    },
  }),
);
