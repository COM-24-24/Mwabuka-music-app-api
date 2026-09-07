import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
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
    // Verify user exists
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Verify track exists
    const track = await this.trackRepository.findOne({
      where: { id: trackId },
    });
    if (!track) {
      throw new NotFoundException(`Track with ID ${trackId} not found`);
    }

    // Check if favorite already exists
    const existingFavorite = await this.favoriteRepository.findOne({
      where: { user: { id: userId }, track: { id: trackId } },
    });
    if (existingFavorite) {
      throw new BadRequestException('This track is already in your favorites');
    }

    // Create and save favorite with loaded entities
    const favorite = this.favoriteRepository.create({ user, track });
    return this.favoriteRepository.save(favorite);
  }

  async getMyFavorites(userId: number): Promise<Favorite[]> {
    return this.favoriteRepository.find({
      where: { user: { id: userId } },
      relations: { track: true, user: true },
    });
  }

  async removeFavorite(userId: number, trackId: number): Promise<void> {
    const favorite = await this.favoriteRepository.findOne({
      where: { user: { id: userId }, track: { id: trackId } },
    });
    if (!favorite) {
      throw new NotFoundException('Favorite not found');
    }
    await this.favoriteRepository.delete({
      user: { id: userId },
      track: { id: trackId },
    });
  }

  async checkFavorite(userId: number, trackId: number): Promise<boolean> {
    const favorite = await this.favoriteRepository.findOne({
      where: { user: { id: userId }, track: { id: trackId } },
    });
    return !!favorite;
  }
}
