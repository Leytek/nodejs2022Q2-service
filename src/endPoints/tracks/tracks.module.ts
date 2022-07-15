import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { FavoritesService } from '../favorites/favorites.service';

@Module({
  providers: [TracksService, FavoritesService],
  controllers: [TracksController],
})
export class TracksModule {}
