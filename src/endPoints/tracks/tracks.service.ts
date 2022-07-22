import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from './entities/track.entity';
import { UpdateTrackDto } from './dto/update-track.dto';
import { CreateTrackDto } from './dto/create-track.dto';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}

  create(dto: CreateTrackDto): Promise<Track | null> {
    const newTrack = this.trackRepository.create(dto);
    return this.trackRepository.save(newTrack);
  }

  getAll(): Promise<Track[] | null> {
    return this.trackRepository.find();
  }

  getOne(id: string): Promise<Track | null> {
    return this.trackRepository.findOneBy({ id });
  }

  async update(id: string, dto: UpdateTrackDto): Promise<Track | null> {
    const track = await this.trackRepository.findOneBy({ id });

    if (!track) return null;

    await this.trackRepository.update(id, dto);
    return this.trackRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.trackRepository.delete(id);
    return result.affected !== 0;
  }
}
