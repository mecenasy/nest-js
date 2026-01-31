import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { PasswordService } from '../user/password/password.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from './entity/role.entity';
import { IUser } from './model/user.model';
import { PersonService } from 'src/person/person.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly passwordService: PasswordService,
    private readonly personService: PersonService,
  ) {}

  public async register(registerUser: CreateUserDto): Promise<User> {
    const existingUser = await this.findUserByEmail(registerUser.email);

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    return await this.createUser(registerUser);
  }

  public async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.password', 'password')
      .leftJoinAndSelect('user.person', 'person')
      .leftJoinAndSelect('user.roles', 'roles')
      .where('user.email = :email', { email })
      .getOne();

    // this is worst solution

    // return await this.userRepository.findOne({
    //   where: { email },
    //   relations: { password: true },
    // });
  }

  public async findUserById(id: string): Promise<User | null> {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .leftJoinAndSelect('user.person', 'person')
      .leftJoinAndSelect('user.student', 'student')
      .leftJoinAndSelect('person.address', 'address')
      .where('user.id = :id', { id })
      .getOne();

    // return await this.userRepository.findOne({
    //   where: { id },
    //   relations: { roles: true },
    // });
  }

  public async removeUser(user: User): Promise<void> {
    await this.userRepository.delete(user.id);
  }

  private async createUser(userDto: CreateUserDto): Promise<User> {
    const role = await this.roleRepository
      .createQueryBuilder('role')
      .where('role.name = :name', { name: userDto.role })
      .getMany();

    if (!role?.length) {
      throw new BadRequestException('Role not found');
    }

    const hashedPassword = this.passwordService.generatePassword(
      userDto.password,
    );
    const person = this.personService.create(userDto.person, userDto.address);

    const user = this.userRepository.create({
      email: userDto.email,
      password: hashedPassword,
      roles: role,
    });
    user.person = person;
    person.user = user;

    return await this.userRepository.save(user);
  }
}
