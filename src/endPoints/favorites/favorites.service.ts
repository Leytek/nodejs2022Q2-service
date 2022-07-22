import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
    private readonly albumsService: AlbumsService,
    private readonly artistsService: ArtistsService,
    private readonly tracksService: TracksService,
  ) {}

  async getAll(): Promise<Favorite> {
    const favorites = await this.favoriteRepository.find({
      relations: {
        artists: true,
        albums: true,
        tracks: true,
      },
    });

    if (favorites.length) return favorites[0];

    return this.favoriteRepository.save({
      albums: [],
      artists: [],
      tracks: [],
    });
  }

  async add(type: string, id: string) {
    const favorites = await this.getAll();
    const typeFav = favorites[type];
    const instance = await this[type + 'Service'].getOne(id);

    if (!instance) return null;

    const hasInstance = typeFav.some((c) => c.id === id);

    if (!hasInstance) {
      typeFav.push(instance);
      await this.favoriteRepository.save(favorites);
    }
    return instance;
  }

  async remove(type: string, id: string) {
    const favorites = await this.getAll();
    const length = favorites[type].length;

    favorites[type] = favorites[type].filter((c) => c.id !== id);

    if (favorites[type].length === length) return false;

    await this.favoriteRepository.save(favorites);
    return true;
  }
}
