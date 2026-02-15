import { generate } from 'selfsigned';
import { constants } from 'fs';
import { access, writeFile } from 'fs/promises';
import path from 'path';

export const generateKeyPair = async () => {
  const keyPath = path.resolve(__dirname, '../cert');
  const certPath = path.join(keyPath, 'cert.pem');
  const privKeyPath = path.join(keyPath, 'privkey.pem');

  try {
    await access(certPath, constants.F_OK);
    await access(privKeyPath, constants.F_OK);
    return;
  } catch {}
  const pems = await generate([{ name: 'commonName', value: 'localhost' }], {
    notAfterDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    algorithm: 'sha256',
    keySize: 2048,
    extensions: [
      {
        name: 'subjectAltName',
        altNames: [
          { type: 2, value: 'localhost' },
          { type: 7, ip: '127.0.0.1' },
        ],
      },
    ],
  });
  await writeFile(privKeyPath, pems.private);
  await writeFile(certPath, pems.cert);
};
