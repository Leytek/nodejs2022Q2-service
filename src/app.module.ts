import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumsModule } from './endPoints/albums/albums.module';
import { ArtistsModule } from './endPoints/artists/artists.module';
import { FavoritesModule } from './endPoints/favorites/favorites.module';
import { TracksModule } from './endPoints/tracks/tracks.module';
import { UsersModule } from './endPoints/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot(dataSourceOptions),
    AlbumsModule,
    ArtistsModule,
    FavoritesModule,
    TracksModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
