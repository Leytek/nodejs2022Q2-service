import {
  IsUUID,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  login: string;

  @Column()
  @Exclude()
  @IsNotEmpty()
  @IsString()
  password: string;

  @VersionColumn()
  @IsOptional()
  @IsNumber()
  version: number;

  @CreateDateColumn({
    transformer: {
      from: (value: Date) => value.getTime(),
      to: (value: Date) => value,
    },
  })
  @IsOptional()
  @IsNumber()
  createdAt: number;

  @UpdateDateColumn({
    transformer: {
      from: (value: Date) => value.getTime(),
      to: (value: Date) => value,
    },
  })
  @IsOptional()
  @IsNumber()
  updatedAt: number;

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
