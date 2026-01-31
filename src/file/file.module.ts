import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/person/entity/person.entity';
import { FileController } from './file.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Person])],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
