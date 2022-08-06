import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist } from '../../artists/entities/artist.entity';

@Entity('album')
export class Album {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column()
  @IsNotEmpty()
  @IsInt()
  year: number;

  @Column({ nullable: true })
  @IsUUID()
  @IsOptional()
  artistId: string | null;

  @ManyToOne(() => Artist, (artist) => artist.id, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'artistId' })
  artist: string | null;
}
