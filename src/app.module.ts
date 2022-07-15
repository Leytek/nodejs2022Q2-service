import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumModule } from './endPoints/albums/albums.module';
import { ArtistModule } from './endPoints/artists/artists.module';
import { TrackModule } from './endPoints/tracks/tracks.module';
import { FavoritesModule } from './endPoints/favorites/favorites.module';
import { UserModule } from './endPoints/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    UsersModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
