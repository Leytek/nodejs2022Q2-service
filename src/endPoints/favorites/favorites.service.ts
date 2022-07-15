import { dataBase } from 'src/DB/DB';
import { Favorite } from './entities/favorite.entity';

export class FavoritesService {
  constructor() {
    dataBase.createTable('albumFav');
    dataBase.createRecord('albumFav', '0', { set: new Set() });
    dataBase.createTable('artistFav');
    dataBase.createRecord('artistFav', '0', { set: new Set() });
    dataBase.createTable('trackFav');
    dataBase.createRecord('trackFav', '0', { set: new Set() });
  }

  async getAll(): Promise<Favorite> {
    const recordAlbums = (await dataBase.getRecord('albumFav', '0')) as {
      id: string;
      set: [];
    };
    const recordArtists = (await dataBase.getRecord('artistFav', '0')) as {
      id: string;
      set: [];
    };
    const recordTracks = (await dataBase.getRecord('trackFav', '0')) as {
      id: string;
      set: [];
    };
    const favoriteAlbums = Array.from(recordAlbums.set);
    const favoriteArtists = Array.from(recordArtists.set);
    const favoriteTracks = Array.from(recordTracks.set);

    const albums = (
      await Promise.allSettled(
        favoriteAlbums.map((id: string) => dataBase.getRecord('albums', id)),
      )
    ).map((item: PromiseSettledResult<any>) =>
      item.status === 'fulfilled' ? item.value : null,
    );

    const artists = (
      await Promise.allSettled(
        favoriteArtists.map((id: string) => dataBase.getRecord('artists', id)),
      )
    ).map((item: PromiseSettledResult<any>) =>
      item.status === 'fulfilled' ? item.value : null,
    );

    const tracks = (
      await Promise.allSettled(
        favoriteTracks.map((id: string) => dataBase.getRecord('tracks', id)),
      )
    ).map((item: PromiseSettledResult<any>) =>
      item.status === 'fulfilled' ? item.value : null,
    );

    return {
      albums,
      artists,
      tracks,
    };
  }

  async add(type: string, id: string) {
    const fav = dataBase.getRecord(type, id);
    if (!fav) return null;

    const record = (await dataBase.getRecord(type + 'Fav', '0')) as {
      id: string;
      set: Set<string>;
    };
    record.set.add(id);
    return fav;
  }

  async remove(type: string, id: string) {
    const record = (await dataBase.getRecord(type + 'Fav', '0')) as {
      id: string;
      set: Set<string>;
    };
    return record.set.delete(id);
  }
}
