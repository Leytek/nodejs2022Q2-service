import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { FavoritesService } from '../favorites/favorites.service';

@Module({
  imports: [TypeOrmModule.forFeature([Track])],
  providers: [TracksService, FavoritesService],
  controllers: [TracksController],
})
export class TracksModule {}
