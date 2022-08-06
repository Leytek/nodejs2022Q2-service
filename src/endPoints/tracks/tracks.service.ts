import { v4 } from 'uuid';
import { dataBase } from 'src/DB/DB';
import { Track } from './entities/track.entity';
import { UpdateTrackDto } from './dto/update-track.dto';
import { CreateTrackDto } from './dto/create-track.dto';

export class TracksService {
  constructor() {
    dataBase.createTable('track');
  }

  create(dto: CreateTrackDto): Promise<Track | null> {
    const record = {
      name: dto.name,
      duration: dto.duration,
      artistId: dto.artistId || null,
      albumId: dto.albumId || null,
    };
    return dataBase.createRecord(
      'track',
      v4(),
      record,
    ) as Promise<Track | null>;
  }

  getAll(): Promise<Track[] | null> {
    return dataBase.getAll('track') as Promise<Track[] | null>;
  }

  getOne(id: string): Promise<Track | null> {
    return dataBase.getRecord('track', id) as Promise<Track | null>;
  }

  update(id: string, dto: UpdateTrackDto): Promise<Track | null> {
    return dataBase.updateRecord('track', id, dto) as Promise<Track | null>;
  }

  remove(id: string): Promise<boolean> {
    return dataBase.removeRecord('track', id);
  }

  async removeAlbum(id: string) {
    const tracks = await (dataBase.getAll('track') as Promise<Track[] | null>);
    for (const track of tracks) {
      if (track.albumId === id)
        await dataBase.updateRecord('track', track.id, { albumId: null });
    }
  }

  async removeArtist(id: string) {
    const tracks = await (dataBase.getAll('track') as Promise<Track[] | null>);
    for (const track of tracks) {
      if (track.artistId === id)
        await dataBase.updateRecord('track', track.id, { artistId: null });
    }
  }
}
