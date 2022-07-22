import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('artist')
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column({ default: false })
  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}
