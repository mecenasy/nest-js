import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entity/student.entity';
import { GetStudentsParams } from '../student/params/get-students.params';
import { User } from '../user/entity/user.entity';

@Injectable()
export class StudentService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async createStudent(dto: CreateStudentDto): Promise<Student> {
    const user = await this.userRepository.findOneBy({ id: dto.studentId });

    if (!user) {
      throw new BadRequestException('studentId is required');
    }

    return await this.studentRepository.save({
      ...dto,
      student: user,
    });
  }

  public async updateStudent(dto: UpdateStudentDto): Promise<Student> {
    if (!dto.studentId) {
      throw new BadRequestException('studentId is required');
    }

    const student = await this.studentRepository.findOne({
      where: { student: { id: dto.studentId } },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return await this.studentRepository.save({ ...student, ...dto });
  }

  public async deleteStudent(id: string): Promise<void> {
    const student = await this.studentRepository.findOne({
      where: { student: { id } },
    });

    if (student) {
      student.active = false;
      await this.studentRepository.save(student);
      return;
    }

    throw new NotFoundException('Student not found');
  }

  public async getStudent(
    userId?: string,
    numberId?: string,
  ): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: [{ album: numberId }, { student: { id: userId } }],
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return student;
  }

  public async getStudents(
    query: GetStudentsParams,
  ): Promise<[Student[], number]> {
    const qb = this.studentRepository
      .createQueryBuilder('student')
      .leftJoinAndSelect('student.student', 'user')
      .leftJoinAndSelect('user.person', 'person')
      .leftJoinAndSelect('person.address', 'address');

    if (query.directions?.length) {
      qb.andWhere('student.direction IN (:...directions)', {
        directions: query.directions,
      });
    }

    if (query.specialties?.length) {
      qb.andWhere('student.specialty IN (:...specialties)', {
        specialties: query.specialties,
      });
    }
    if (query.group?.length) {
      qb.andWhere('student.group IN (:...groups)', {
        groups: query.group,
      });
    }

    if (query.years?.length) {
      qb.andWhere('student.year IN (:...years)', {
        years: query.years,
      });
    }

    return await qb.getManyAndCount();
  }
}
