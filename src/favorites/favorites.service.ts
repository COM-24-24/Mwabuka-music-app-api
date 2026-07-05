import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { Repository } from 'typeorm';
import { Users } from 'src/users/entities/user.entity';
import { Tracks } from 'src/music/tracks/entities/tracks.entity';

@Injectable()
export class FavoritesService {
    constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,

    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,

    @InjectRepository(Tracks)
    private readonly trackRepository: Repository<Tracks>,
    ) {}

    async createFavorite(userId: number, trackId: number): Promise<Favorite> {
        const favorite = this.favoriteRepository.create({ user: { id: userId }, track: { id: trackId } });
        return this.favoriteRepository.save(favorite);
    }

    async getMyFavorites(userId: number): Promise<Favorite[]> {
        return this.favoriteRepository.find({ where: { user: { id: userId } } });
    }

    async removeFavorite(userId: number, trackId: number): Promise<void> {
        await this.favoriteRepository.delete({ user: { id: userId }, track: { id: trackId } });
    }

    async checkFavorite(userId: number, trackId: number): Promise<boolean> {
        const favorite = await this.favoriteRepository.findOne({ where: { user: { id: userId }, track: { id: trackId } } });
        return !!favorite;
    }
}
