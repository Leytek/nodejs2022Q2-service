import { v4 } from 'uuid';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { dataBase } from '../../DB/DB';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { MESSAGES } from '../../messages';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  create(dto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(dto);
    console.log(typeof newUser.createdAt);
    return this.userRepository.save(newUser);
  }

  getAll(): Promise<User[] | null> {
    return this.userRepository.find();
  }

  getOne(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: string, dto: UpdatePasswordDto): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) return null;

    if (user.password !== dto.oldPassword)
      throw new ForbiddenException(MESSAGES.wrongOldPassword);

    await this.userRepository.update(id, { password: dto.newPassword });
    return this.userRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return result.affected !== 0;
  }
}
