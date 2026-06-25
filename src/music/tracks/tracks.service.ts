import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tracks } from './entities/tracks.entity';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';

@Injectable()
export class TracksService {
    constructor(
        @InjectRepository(Tracks)
        private readonly tracksRepository: Repository<Tracks>,
    ) {}

    async create(dto: CreateTrackDto): Promise<Tracks> {
        const newTrack = this.tracksRepository.create(dto);
        return this.tracksRepository.save(newTrack);
    }

    async findAll(): Promise<Tracks[]> {
        return this.tracksRepository.find();
    }

    async findOne(id: number): Promise<Tracks> {
        const track = await this.tracksRepository.findOne({ where: { id } });
        if (!track) {
            throw new Error(`Track with ID ${id} not found`);
        }
        return track;
    }

    async findTracks(releaseId: number): Promise<Tracks[]> {
        return this.tracksRepository.find({ where: { releaseId } });
    }

    async update(id: number, updatedTrack: Partial<Tracks>): Promise<Tracks> {
        const track = await this.findOne(id);
        Object.assign(track, updatedTrack);
        return this.tracksRepository.save(track);
    }

    async remove(id: number): Promise<void> {
        const track = await this.findOne(id);
        await this.tracksRepository.remove(track);
    }
}
