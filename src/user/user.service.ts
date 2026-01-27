import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { PasswordService } from 'src/user/password/password.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly passwordService: PasswordService,
  ) {}

  public async createUser(userDto: CreateUserDto): Promise<User> {
    const hashedPassword = this.passwordService.generatePassword(
      userDto.password,
    );

    const user = this.userRepository.create({
      email: userDto.email,
      name: userDto.name,
      password: hashedPassword,
    });

    return await this.userRepository.save(user);
  }
  public async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.password', 'password')
      .where('user.email = :email', { email })
      .getOne();

    // this is worst solution

    // return await this.userRepository.findOne({
    //   where: { email },
    //   relations: { password: true },
    // });
  }

  public async findUserById(id: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  public async removeUser(user: User): Promise<void> {
    await this.userRepository.delete(user.id);
  }
}
