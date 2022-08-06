import { v4 } from 'uuid';
import { dataBase } from 'src/DB/DB';
import { Artist } from './entities/artist.entity';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { CreateArtistDto } from './dto/create-artist.dto';

export class ArtistsService {
  constructor() {
    dataBase.createTable('artist');
  }

  create(dto: CreateArtistDto): Promise<Artist | null> {
    const record = {
      name: dto.name,
      grammy: dto.grammy,
    };
    return dataBase.createRecord(
      'artist',
      v4(),
      record,
    ) as Promise<Artist | null>;
  }

  getAll(): Promise<Artist[] | null> {
    return dataBase.getAll('artist') as Promise<Artist[] | null>;
  }

  getOne(id: string): Promise<Artist | null> {
    return dataBase.getRecord('artist', id) as Promise<Artist | null>;
  }

  update(id: string, dto: UpdateArtistDto): Promise<Artist | null> {
    return dataBase.updateRecord('artist', id, dto) as Promise<Artist | null>;
  }

  remove(id: string): Promise<boolean> {
    return dataBase.removeRecord('artist', id);
  }
}
