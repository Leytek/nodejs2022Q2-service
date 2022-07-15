import { v4 } from 'uuid';
import { dataBase } from 'src/DB/DB';
import { Album } from './entities/album.entity';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { CreateAlbumDto } from './dto/create-album.dto';

export class AlbumsService {
  constructor() {
    dataBase.createTable('album');
  }

  create(dto: CreateAlbumDto): Promise<Album | null> {
    const record = {
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId || null,
    };
    return dataBase.createRecord(
      'album',
      v4(),
      record,
    ) as Promise<Album | null>;
  }

  getAll(): Promise<Album[] | null> {
    return dataBase.getAll('album') as Promise<Album[] | null>;
  }

  getOne(id: string): Promise<Album | null> {
    return dataBase.getRecord('album', id) as Promise<Album | null>;
  }

  update(id: string, dto: UpdateAlbumDto): Promise<Album | null> {
    return dataBase.updateRecord('album', id, dto) as Promise<Album | null>;
  }

  remove(id: string): Promise<boolean> {
    return dataBase.removeRecord('album', id);
  }

  async removeArtist(id: string) {
    const albums = await (dataBase.getAll('album') as Promise<Album[] | null>);
    albums.forEach((element) => {
      if (element.id === id)
        dataBase.updateRecord('album', id, { artistId: null });
    });
  }
}
