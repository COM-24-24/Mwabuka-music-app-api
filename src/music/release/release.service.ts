import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Release } from './entites/release.entity';
import { Repository } from 'typeorm';
import { CreateReleaseDto } from './dto/create-release.dto';

@Injectable()
export class ReleaseService {
    constructor(
        @InjectRepository(Release) 
        private readonly releaseRepository: Repository<Release>,
    ) {}

    async createRelease(dto: CreateReleaseDto): Promise<Release> {
        const releaseData = {
            ...dto,
            releaseDate: dto.releaseDate,
        };
        const newRelease = this.releaseRepository.create(releaseData);
        return this.releaseRepository.save(newRelease);
    }

    async getAllReleases(): Promise<Release[]> {
        return this.releaseRepository.find();
    }

    async getReleaseById(id: number): Promise<Release> {
        const release = await this.releaseRepository.findOne({ where: { id } });
        if (!release) {
            throw new Error(`Release with ID ${id} not found`);
        }
        return release;
    }

    async updateRelease(id: number, dto: Partial<CreateReleaseDto>): Promise<Release> {
        const release = await this.getReleaseById(id);
        const updateData = { ...dto };
        if (dto.releaseDate) {
            (updateData as any).releaseDate = dto.releaseDate;
        }
        Object.assign(release, updateData);
        return this.releaseRepository.save(release);
    }

    async deleteRelease(id: number): Promise<{ message: string }> {
        const release = await this.getReleaseById(id);
        await this.releaseRepository.remove(release);

        return {message: `Release with ID ${id} has been deleted successfully.`};
    }
}
