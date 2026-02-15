import { Injectable } from '@nestjs/common';
import { DataSource, EntityTarget } from 'typeorm';
import { Grade } from './entity/grade.entity';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { User } from 'src/user/entity/user.entity';
import { Subject } from 'src/university/subject/entity/subject.entity';
import { GetGradeByStudentResponse } from './response/get-grade-by-student.response';
import { GetGradeByTeacherResponse } from './response/get-grade-by-teacher.response';
import { CreateGradeResponse } from './response/create-grade.response';
import { UpdateGradeResponse } from './response/update-grade.response';
interface RawData {
  year: string;
  group: string;
  studentId: string;
  studentFullName: string;
  gradeId: string;
  gradeValue: string;
  gradeDate: Date;
  subject: string;
  subjectId: string;
}

interface RawDataCreate {
  subject: string;
  studentId: string;
  studentName: string;
  grade: string;
  time: Date;
  id: string;
  subjectId: string;
}

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

  async create(createGradeDto: CreateGradeDto): Promise<CreateGradeResponse> {
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

    await this.dataSource.manager.save(newGrade);
    return await this.getAfterCreate(newGrade.id);
  }

  private async getAfterCreate(id: string): Promise<CreateGradeResponse> {
    const result = await this.dataSource
      .getRepository(Grade)
      .createQueryBuilder('grade')
      .innerJoin('grade.subject', 'subject')
      .innerJoin('grade.student', 'student')
      .innerJoin('student.person', 'person')
      .where('grade.id = :id', { id })
      .select([
        'subject.name AS subject',
        'student.id AS "studentId"',
        'person.name || \' \' || person.surname AS "studentName"',
        'grade.grade AS grade',
        'grade.updateTime AS time',
        'grade.id AS id',
        'subject.id AS subjectId',
      ])
      .getRawOne<RawDataCreate>();

    return this.convertRawToCreateResponse(result as RawDataCreate);
  }
  async findAll(): Promise<Grade[]> {
    return await this.dataSource.getRepository(Grade).find();
  }

  async findOne(id: string): Promise<Grade> {
    return await this.dataSource
      .getRepository(Grade)
      .findOneOrFail({ where: { id } });
  }

  async update({ grade, id }: UpdateGradeDto): Promise<UpdateGradeResponse> {
    await this.dataSource.manager.update(Grade, id, { grade });
    return await this.getAfterCreate(id);
  }

  async remove(id: string): Promise<void> {
    await this.dataSource.manager.delete(Grade, id);
  }

  async findByStudent(studentId: string): Promise<GetGradeByStudentResponse[]> {
    return await this.dataSource
      .getRepository(Grade)
      .createQueryBuilder('grades')
      .innerJoin('grades.subject', 'subject')
      .where('grades.studentId = :studentId', { studentId })
      .select('subject.name', 'subject')
      .addSelect(
        `json_agg(
          json_build_object(
            'id', "grades"."id",
            'grade', "grades"."grade",
            'date', "grades"."updateTime"
          )
      )`,
        'grades',
      )
      .groupBy('subject.id')
      .getRawMany();
  }

  async findByTeacher(teacherId: string): Promise<GetGradeByTeacherResponse[]> {
    const data = await this.dataSource
      .getRepository(Subject)
      .createQueryBuilder('subject')
      .innerJoin('subject.years', 'year')
      .innerJoin('subject.groups', 'group')
      .innerJoin('group', 'g', 'g.name = group.name')
      .innerJoin('student', 's', 's.group = g.name')
      .innerJoin('user', 'u', 'u.id = s.studentId')
      .innerJoin('person', 'person', 'person.userId = u.id')
      .leftJoin(
        'grade',
        'gr',
        's.studentId = gr.studentId AND subject.id = gr.subjectId',
      )
      .where('subject.teacherId = :teacherId', { teacherId })
      .select([
        'year.name AS year',
        'group.name AS group',
        'subject.name AS subject',
        'subject.id AS "subjectId"',
        's.studentId AS "studentId"',
        'person.name || \' \' || person.surname AS "studentFullName"',
        'gr.id AS "gradeId"',
        'gr.grade AS "gradeValue"',
        'gr.updateTime AS "gradeDate"',
      ])
      .getRawMany<RawData>();

    return this.convertRawToGetByTeacherResponse(data);
  }

  async findStudentsWithoutGrades(): Promise<User[]> {
    return await this.dataSource
      .getRepository(User)
      .createQueryBuilder('u')
      .leftJoin('u.roles', 'r')
      .leftJoin(Grade, 'grade', 'grade.studentId = u.id')
      .where('r.name = :role', { role: 'student' })
      .andWhere('grade.id IS NULL')
      .getMany();
  }

  private convertRawToCreateResponse(data: RawDataCreate): CreateGradeResponse {
    return {
      id: data.id,
      grade: data.grade,
      time: data.time,
      subject: {
        id: data.subjectId,
        name: data.subject,
      },
      student: {
        id: data.studentId,
        name: data.studentName,
      },
    };
  }

  private convertRawToGetByTeacherResponse(
    data: RawData[],
  ): GetGradeByTeacherResponse[] {
    return data.reduce<GetGradeByTeacherResponse[]>((acc, item) => {
      let group = acc.find(
        (el) => el.group === item.group && el.year === item.year,
      );

      if (!group) {
        group = {
          group: item.group,
          year: item.year,
          subjects: [],
        };
        acc.push(group);
      }

      let subject = group.subjects.find((s) => s.id === item.subjectId);

      if (!subject) {
        subject = {
          id: item.subjectId,
          name: item.subject,
          students: [],
        };
        group.subjects.push(subject);
      }
      let student = subject.students.find((s) => s.id === item.studentId);

      if (!student) {
        student = {
          id: item.studentId,
          name: item.studentFullName,
          grades: [],
        };
        subject.students.push(student);
      }
      if (item.gradeId) {
        student.grades.push({
          id: item.gradeId,
          grade: item.gradeValue,
          date: item.gradeDate,
        });
      }

      return acc;
    }, []);
  }
}
