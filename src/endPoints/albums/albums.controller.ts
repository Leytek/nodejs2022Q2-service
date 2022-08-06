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
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { MESSAGES } from 'src/messages';
import { UUID } from 'src/settings';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  @HttpCode(StatusCodes.CREATED)
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumsService.create(createAlbumDto);
  }

  @Get()
  @HttpCode(StatusCodes.OK)
  async getAll() {
    return await this.albumsService.getAll();
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
    const album = await this.albumsService.getOne(id);

    if (!album) {
      throw new NotFoundException(MESSAGES.albumNotFound);
    }

    return album;
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
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const updatedAlbum = await this.albumsService.update(id, updateAlbumDto);

    if (!updatedAlbum) {
      throw new NotFoundException(MESSAGES.albumNotFound);
    }
    return updatedAlbum;
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
    const album = await this.albumsService.remove(id);

    if (!album) {
      throw new NotFoundException(MESSAGES.albumNotFound);
    }

    return album;
  }
}
