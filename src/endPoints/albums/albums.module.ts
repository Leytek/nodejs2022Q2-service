import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { FavoritesService } from '../favorites/favorites.service';
import { TracksService } from '../tracks/tracks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Album])],
  providers: [AlbumsService, FavoritesService, TracksService],
  controllers: [AlbumsController],
})
export class AlbumsModule {}
