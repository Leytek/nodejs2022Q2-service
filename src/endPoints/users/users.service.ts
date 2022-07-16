import { v4 } from 'uuid';
import { ForbiddenException } from '@nestjs/common';
import { dataBase } from '../../DB/DB';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { MESSAGES } from '../../messages';

export class UsersService {
  constructor() {
    dataBase.createTable('users');
  }

  async create(dto: CreateUserDto) {
    const now = Date.now();
    const record = {
      ...dto,
      version: 1,
      createdAt: now,
      updatedAt: now,
    };
    const user = (await dataBase.createRecord(
      'users',
      v4(),
      record,
    )) as User | null;

    if (user) return new User(user);

    return null;
  }

  async getAll(): Promise<User[] | null> {
    const users = (await dataBase.getAll('users')) as User[] | null;

    if (users) return users.map((c) => new User(c)) as User[];

    return null;
  }

  async getOne(id: string): Promise<User | null> {
    const user = (await dataBase.getRecord('users', id)) as User | null;

    if (user) return new User(user);

    return null;
  }

  async update(id: string, dto: UpdatePasswordDto): Promise<User | null> {
    const user = (await dataBase.getRecord('users', id)) as unknown as User;

    if (!user) return null;

    if (user.password !== dto.oldPassword)
      throw new ForbiddenException(MESSAGES.wrongOldPassword);

    const record = {
      password: dto.newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    };

    const updatedUser = (await dataBase.updateRecord(
      'users',
      id,
      record,
    )) as User | null;

    return new User(updatedUser);
  }

  remove(id: string): Promise<boolean> {
    return dataBase.removeRecord('users', id);
  }
}
