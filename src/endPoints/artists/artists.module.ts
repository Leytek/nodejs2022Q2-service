import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { AlbumsService } from '../albums/albums.service';
import { FavoritesService } from '../favorites/favorites.service';
import { TracksService } from '../tracks/tracks.service';

@Module({
  providers: [ArtistsService, AlbumsService, FavoritesService, TracksService],
  controllers: [ArtistsController],
})
export class ArtistsModule {}
