import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Subject } from './entity/subject.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { DataSource } from 'typeorm';
import { User } from 'src/user/entity/user.entity';
import { Year } from '../year/entity/year.entity';
import { Specialty } from '../specialty/entity/specialty.entity';
import { Group } from '../group/entity/group.entity';

@Injectable()
export class SubjectService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}

  async createSubject(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    const { teacher, groups, years, specialties, ...rest } = createSubjectDto;

    const [foundUser, foundGroups, foundYears, foundSpecialty] =
      await Promise.all([
        this.getUser(teacher).getOneOrFail(),
        this.getGroups(groups).getMany(),
        this.getYears(years).getMany(),
        this.getSpecialties(specialties).getMany(),
      ]);

    const subject = this.subjectRepository.create({
      ...rest,
      teacher: foundUser,
      years: foundYears,
      specialty: foundSpecialty,
      groups: foundGroups,
    });

    return await this.subjectRepository.save(subject);
  }

  async getSubjects(): Promise<Subject[]> {
    return await this.dataSource
      .getRepository(Subject)
      .createQueryBuilder('subject')
      .leftJoinAndSelect('subject.teacher', 'teacher')
      .leftJoinAndSelect('teacher.person', 'person')
      .leftJoinAndSelect('subject.groups', 'groups')
      .leftJoinAndSelect('subject.years', 'years')
      .leftJoinAndSelect('subject.specialty', 'specialty')
      .getMany();
  }

  async getSubjectsByTeacher(teacherId: string): Promise<Subject[]> {
    return await this.dataSource
      .getRepository(Subject)
      .createQueryBuilder('subject')
      .leftJoinAndSelect('subject.teacher', 'teacher')
      .leftJoinAndSelect('teacher.person', 'person')
      .leftJoinAndSelect('subject.groups', 'groups')
      .leftJoinAndSelect('subject.years', 'years')
      .leftJoinAndSelect('subject.specialty', 'specialty')
      .where('teacher.id = :teacherId', { teacherId })
      .getMany();
  }

  async getSubjectById(id: string): Promise<Subject> {
    return await this.dataSource
      .getRepository(Subject)
      .createQueryBuilder('subject')
      .leftJoinAndSelect('subject.teacher', 'teacher')
      .leftJoinAndSelect('teacher.person', 'person')
      .leftJoinAndSelect('subject.groups', 'groups')
      .leftJoinAndSelect('subject.years', 'years')
      .leftJoinAndSelect('subject.specialty', 'specialty')
      .where('subject.id = :id', { id })
      .getOneOrFail();
  }
  async removeSubject(id: string): Promise<void> {
    await this.dataSource
      .getRepository(Subject)
      .createQueryBuilder('subject')
      .where('subject.id = :id', { id })
      .delete()
      .execute();
  }

  async updateSubject(
    id: string,
    updateSubjectDto: UpdateSubjectDto,
  ): Promise<Subject> {
    const { teacher, groups, years, specialties, auditorium, name } =
      updateSubjectDto;

    const subject = await this.getSubjectById(id);
    if (name) {
      subject.name = name;
    }

    if (auditorium) {
      subject.auditorium = auditorium;
    }

    if (teacher) {
      subject.teacher = await this.getUser(teacher).getOneOrFail();
    }

    if (groups) {
      subject.groups = await this.getGroups(groups).getMany();
    }

    if (years) {
      subject.years = await this.getYears(years).getMany();
    }

    if (specialties) {
      subject.specialty = await this.getSpecialties(specialties).getMany();
    }

    return await this.subjectRepository.save(subject);
  }

  private getUser(teacher: string): SelectQueryBuilder<User> {
    return this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.person', 'person')
      .innerJoin('user.roles', 'roles')
      .where('user.id = :id', { id: teacher })
      .andWhere('roles.name = :role', { role: 'teacher' });
  }

  private getYears(years: string[]): SelectQueryBuilder<Year> {
    return this.dataSource
      .getRepository(Year)
      .createQueryBuilder('year')
      .select()
      .where('year.name IN (:...ids)', { ids: years });
  }

  private getSpecialties(specialties: string[]): SelectQueryBuilder<Specialty> {
    return this.dataSource
      .getRepository(Specialty)
      .createQueryBuilder('specialty')
      .select()
      .where('specialty.name IN (:...id)', { id: specialties });
  }

  private getGroups(groups: string[]): SelectQueryBuilder<Group> {
    return this.dataSource
      .getRepository(Group)
      .createQueryBuilder('group')
      .select()
      .where('group.name IN (:...ids)', { ids: groups });
  }
}
