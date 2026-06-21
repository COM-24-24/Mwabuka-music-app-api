import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReleaseService } from './release.service';
import { ReleaseController } from './release.controller';
import { Release } from './entites/release.entity';
import { Tracks } from '../tracks/entities/tracks.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Release,
      Tracks,
    ]),
  ],
  controllers: [ReleaseController],
  providers: [ReleaseService],
})
export class ReleaseModule {}