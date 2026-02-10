import { Injectable } from '@nestjs/common';
import { DataSource, EntityTarget } from 'typeorm';
import { Grade } from './entity/grade.entity';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { User } from 'src/user/entity/user.entity';
import { Subject } from 'src/university/subject/entity/subject.entity';

@Injectable()
export class GradeService {
  constructor(private readonly dataSource: DataSource) {}

  private async findElementById<T extends User | Subject>(
    entity: EntityTarget<T>,
    id: string,
  ): Promise<T> {
    return await this.dataSource
      .getRepository(entity)
      .createQueryBuilder('db')
      .where('db.id = :id', { id })
      .getOneOrFail();
  }

  async create(createGradeDto: CreateGradeDto): Promise<Grade> {
    const { subjectId, teacherId, studentId, grade } = createGradeDto;

    const [subject, teacher, student] = await Promise.all([
      this.findElementById(Subject, subjectId),
      this.findElementById(User, teacherId),
      this.findElementById(User, studentId),
    ]);

    const newGrade = this.dataSource.manager.create(Grade, {
      grade,
      subject,
      teacher,
      student,
    });

    return this.dataSource.manager.save(newGrade);
  }

  async findAll(): Promise<Grade[]> {
    return await this.dataSource.getRepository(Grade).find();
  }

  async findOne(id: string): Promise<Grade> {
    return await this.dataSource
      .getRepository(Grade)
      .findOneOrFail({ where: { id } });
  }

  async update(id: string, { grade }: UpdateGradeDto): Promise<Grade> {
    await this.dataSource.manager.update(Grade, id, { grade });
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.dataSource.manager.delete(Grade, id);
  }

  async findByStudent(studentId: string): Promise<Grade[]> {
    return await this.dataSource
      .getRepository(Grade)
      .createQueryBuilder('grades')
      .where('grades.studentId = :studentId', { studentId })
      .groupBy('grades.subjectId')
      .getMany();
  }

  async findByTeacher(teacherId: string): Promise<Grade[]> {
    return await this.dataSource
      .getRepository(Grade)
      .createQueryBuilder('grades')
      .innerJoinAndSelect('grades.subject', 'subject')
      .where('grades.teacherId = :teacherId', { teacherId })
      .groupBy('subject.id')
      .addGroupBy('grades.studentId')
      .getMany();
  }
}
