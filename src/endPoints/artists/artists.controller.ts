import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { MESSAGES } from 'src/messages';
import { UUID } from 'src/settings';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  @HttpCode(StatusCodes.CREATED)
  async create(@Body() createArtistDto: CreateArtistDto) {
    return await this.artistsService.create(createArtistDto);
  }

  @Get()
  @HttpCode(StatusCodes.OK)
  async getAll() {
    return await this.artistsService.getAll();
  }

  @Get(':id')
  @HttpCode(StatusCodes.OK)
  async getOne(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: StatusCodes.BAD_REQUEST as number,
        version: UUID,
      }),
    )
    id: string,
  ) {
    const artist = await this.artistsService.getOne(id);

    if (!artist) {
      throw new NotFoundException(MESSAGES.artistNotFound);
    }

    return artist;
  }

  @Put(':id')
  @HttpCode(StatusCodes.OK)
  async update(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: StatusCodes.BAD_REQUEST as number,
        version: UUID,
      }),
    )
    id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const updatedArtist = await this.artistsService.update(id, updateArtistDto);

    if (!updatedArtist) {
      throw new NotFoundException(MESSAGES.artistNotFound);
    }
    return updatedArtist;
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: StatusCodes.BAD_REQUEST as number,
        version: UUID,
      }),
    )
    id: string,
  ) {
    const artist = await this.artistsService.remove(id);

    if (!artist) {
      throw new NotFoundException(MESSAGES.artistNotFound);
    }

    return artist;
  }
}
