import {
  Controller,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { File } from '../interceptors/fie.interceptor';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post(':userId')
  @UseInterceptors(File)
  public async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('userId') id: string,
  ) {
    await this.fileService.uploadFile(file, id);

    return {
      filename: file.filename,
      path: file.path,
    };
  }

  @Put(':userId')
  @UseInterceptors(File)
  public async updateFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('userId') id: string,
  ) {
    await this.fileService.updateFile(file, id);
  }
}
