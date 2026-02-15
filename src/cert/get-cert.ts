import { access, readFile } from 'fs/promises';
import { constants } from 'fs';
import path from 'path';
import { NotFoundException } from '@nestjs/common';

export const getCert = async () => {
  const keyPath = path.resolve(__dirname, '../cert');
  const certPath = path.join(keyPath, 'cert.pem');
  const privKeyPath = path.join(keyPath, 'privkey.pem');

  try {
    await access(certPath, constants.F_OK);
    await access(privKeyPath, constants.F_OK);

    const cert = await readFile(certPath);
    const privKey = await readFile(privKeyPath);

    return {
      cert: cert.toString(),
      key: privKey.toString(),
    };
  } catch {
    throw new NotFoundException('Nie znaleziono pliku certyfikatu');
  }
};
