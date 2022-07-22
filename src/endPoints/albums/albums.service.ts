import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './entities/album.entity';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { CreateAlbumDto } from './dto/create-album.dto';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}

  create(dto: CreateAlbumDto): Promise<Album | null> {
    const newAlbum = this.albumRepository.create(dto);
    return this.albumRepository.save(newAlbum);
  }

  getAll(): Promise<Album[] | null> {
    return this.albumRepository.find();
  }

  getOne(id: string): Promise<Album | null> {
    return this.albumRepository.findOneBy({ id });
  }

  async update(id: string, dto: UpdateAlbumDto): Promise<Album | null> {
    const album = await this.albumRepository.findOneBy({ id });

    if (!album) return null;

    await this.albumRepository.update(id, dto);
    return this.albumRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.albumRepository.delete(id);
    return result.affected !== 0;
  }

  /*async removeArtist(id: string) {
    const albums = await (dataBase.getAll('album') as Promise<Album[] | null>);
    for (const album of albums) {
      if (album.artistId === id)
        await dataBase.updateRecord('album', album.id, { artistId: null });
    }
  }*/
}
