import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { FavoritesService } from '../favorites/favorites.service';

@Module({
  imports: [TypeOrmModule.forFeature([Artist])],
  providers: [ArtistsService, FavoritesService],
  controllers: [ArtistsController],
})
export class ArtistsModule {}
