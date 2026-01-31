import { FileInterceptor } from '@nestjs/platform-express';
import { randomUUID } from 'crypto';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const File = FileInterceptor('image', {
  storage: diskStorage({
    destination: './src/assets',
    filename: (req, file, callback) => {
      const fileName = randomUUID();
      const fileExt = extname(file.originalname);
      callback(null, `${fileName}${fileExt}`);
    },
  }),
});
