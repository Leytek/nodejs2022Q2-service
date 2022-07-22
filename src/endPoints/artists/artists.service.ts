import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './entities/artist.entity';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { CreateArtistDto } from './dto/create-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  create(dto: CreateArtistDto): Promise<Artist | null> {
    const newArtist = this.artistRepository.create(dto);
    return this.artistRepository.save(newArtist);
  }

  getAll(): Promise<Artist[] | null> {
    return this.artistRepository.find();
  }

  getOne(id: string): Promise<Artist | null> {
    return this.artistRepository.findOneBy({ id });
  }

  async update(id: string, dto: UpdateArtistDto): Promise<Artist | null> {
    const artist = await this.artistRepository.findOneBy({ id });

    if (!artist) return null;

    await this.artistRepository.update(id, dto);
    return this.artistRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.artistRepository.delete(id);
    return result.affected !== 0;
  }
}
