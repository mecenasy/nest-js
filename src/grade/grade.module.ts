import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradeService } from './grade.service';
import { GradeController } from './grade.controller';
import { Grade } from './entity/grade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Grade])],
  providers: [GradeService],
  controllers: [GradeController],
})
export class GradeModule {}
