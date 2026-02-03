import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
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

export const FilesMessages = FilesInterceptor('files', 10, {
  storage: diskStorage({
    destination: './src/assets/messages',
    filename: (req, file, callback) => {
      const fileName = randomUUID();
      const fileExt = extname(file.originalname);
      callback(null, `${fileName}${fileExt}`);
    },
  }),
});
