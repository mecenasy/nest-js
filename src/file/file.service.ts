import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from 'src/person/entity/person.entity';
import { Repository } from 'typeorm';
import fs from 'fs/promises';
import path from 'path';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  public async uploadFile(file: Express.Multer.File, id: string) {
    const person = await this.personRepository.findOne({
      where: { userId: id },
      select: {
        photo: true,
      },
    });

    if (!person) {
      throw new NotFoundException('Person not found');
    }

    person.photo = file.filename;
    await this.personRepository.save(person);
    return {
      filename: file.filename,
      path: file.path,
    };
  }

  public async updateFile(file: Express.Multer.File, id: string) {
    const person = await this.personRepository.findOne({
      where: { userId: id },
      select: {
        photo: true,
      },
    });

    const oldPhoto = person?.photo;

    if (oldPhoto) {
      const filePath = path.join(__dirname, '..', 'assets', oldPhoto);

      try {
        await fs.access(filePath);
        await fs.unlink(filePath);
      } catch (error) {
        throw new NotFoundException('File not found', error);
      }

      person.photo = file.filename;
      await this.personRepository.save(person);

      return {
        filename: file.filename,
        path: file.path,
      };
    }

    throw new NotFoundException('Person not found');
  }
}
