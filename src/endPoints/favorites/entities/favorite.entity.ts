import { IsUUID } from 'class-validator';
import { Exclude } from 'class-transformer';
import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Album } from '../../albums/entities/album.entity';
import { Artist } from '../../artists/entities/artist.entity';
import { Track } from '../../tracks/entities/track.entity';

@Entity('favorite')
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @ManyToMany(() => Artist, { eager: true })
  @JoinTable()
  @IsUUID(4, { each: true })
  artists: Artist[];

  @ManyToMany(() => Album, { eager: true })
  @JoinTable()
  @IsUUID(4, { each: true })
  albums: Album[];

  @ManyToMany(() => Track, { eager: true })
  @JoinTable()
  @IsUUID(4, { each: true })
  tracks: Track[];
}
