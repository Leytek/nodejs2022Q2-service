import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  ParseUUIDPipe,
  HttpCode,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { FavoritesService } from './favorites.service';
import { MESSAGES } from 'src/messages';
import { UUID } from 'src/settings';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(StatusCodes.OK)
  async getAll() {
    return await this.favoritesService.getAll();
  }

  @Post('album/:id')
  @HttpCode(StatusCodes.CREATED)
  async addAlbum(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: StatusCodes.BAD_REQUEST as number,
        version: UUID,
      }),
    )
    id: string,
  ) {
    const album = await this.favoritesService.add('albums', id);

    if (!album) {
      throw new UnprocessableEntityException(MESSAGES.albumNotFound);
    }
    return album;
  }

  @Delete('album/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeAlbum(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: StatusCodes.BAD_REQUEST as number,
        version: UUID,
      }),
    )
    id: string,
  ) {
    const album = await this.favoritesService.remove('albums', id);

    if (!album) {
      throw new NotFoundException(MESSAGES.albumNotFound);
    }

    return album;
  }

  @Post('artist/:id')
  @HttpCode(StatusCodes.CREATED)
  async addArtist(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: StatusCodes.BAD_REQUEST as number,
        version: UUID,
      }),
    )
    id: string,
  ) {
    const artist = await this.favoritesService.add('artists', id);

    if (!artist) {
      throw new UnprocessableEntityException(MESSAGES.artistNotFound);
    }
    return artist;
  }

  @Delete('artist/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeArtist(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: StatusCodes.BAD_REQUEST as number,
        version: UUID,
      }),
    )
    id: string,
  ) {
    const artist = await this.favoritesService.remove('artists', id);

    if (!artist) {
      throw new NotFoundException(MESSAGES.artistNotFound);
    }

    return artist;
  }

  @Post('track/:id')
  @HttpCode(StatusCodes.CREATED)
  async addTrack(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: StatusCodes.BAD_REQUEST as number,
        version: UUID,
      }),
    )
    id: string,
  ) {
    const track = await this.favoritesService.add('tracks', id);

    if (!track) {
      throw new UnprocessableEntityException(MESSAGES.trackNotFound);
    }
    return track;
  }

  @Delete('track/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeTrack(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: StatusCodes.BAD_REQUEST as number,
        version: UUID,
      }),
    )
    id: string,
  ) {
    const track = await this.favoritesService.remove('tracks', id);

    if (!track) {
      throw new NotFoundException(MESSAGES.trackNotFound);
    }

    return track;
  }
}
