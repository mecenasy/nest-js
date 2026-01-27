import { registerAs } from '@nestjs/config';
import { type SignOptions } from 'jsonwebtoken';

export interface AuthConfig {
  jwt: {
    secretKey: string;
    expireAt: SignOptions['expiresIn'];
  };
}

export const authConfig = registerAs(
  'auth',
  (): AuthConfig => ({
    jwt: {
      secretKey: process.env.JWT_SECRET_KEY as string,
      expireAt: process.env.JWT_EXPIRE_AT as SignOptions['expiresIn'],
    },
  }),
);
