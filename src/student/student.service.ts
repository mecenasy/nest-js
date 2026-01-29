import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entity/student.entity';
import { GetStudentsParams } from './params/get-students.params';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  public async createStudent(dto: CreateStudentDto): Promise<Student> {
    return await this.studentRepository.save(dto);
  }

  public async updateStudent(dto: UpdateStudentDto): Promise<Student> {
    const student = await this.studentRepository.findOneBy({
      studentId: dto.studentId,
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return await this.studentRepository.save({ ...student, ...dto });
  }

  public async deleteStudent(id: string): Promise<void> {
    await this.studentRepository.delete(id);
  }

  public async getStudent(id: string): Promise<Student> {
    const student = await this.studentRepository.findOneBy({ album: id });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return student;
  }

  public async getStudents(
    query: GetStudentsParams,
  ): Promise<[Student[], number]> {
    return await this.studentRepository.findAndCount();
  }
}
