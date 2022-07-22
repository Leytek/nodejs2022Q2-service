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
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { MESSAGES } from 'src/messages';
import { UUID } from 'src/settings';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  @HttpCode(StatusCodes.CREATED)
  async create(@Body() createTrackDto: CreateTrackDto) {
    return await this.tracksService.create(createTrackDto);
  }

  @Get()
  @HttpCode(StatusCodes.OK)
  async getAll() {
    return await this.tracksService.getAll();
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
    const track = await this.tracksService.getOne(id);

    if (!track) {
      throw new NotFoundException(MESSAGES.trackNotFound);
    }

    return track;
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
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const updatedTrack = await this.tracksService.update(id, updateTrackDto);

    if (!updatedTrack) {
      throw new NotFoundException(MESSAGES.trackNotFound);
    }
    return updatedTrack;
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
    const track = await this.tracksService.remove(id);

    if (!track) {
      throw new NotFoundException(MESSAGES.trackNotFound);
    }

    return track;
  }
}
