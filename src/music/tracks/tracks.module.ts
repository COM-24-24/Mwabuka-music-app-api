import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { Release } from '../release/entites/release.entity';
import { Tracks } from './entities/tracks.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Tracks,
      Release,
    ]),
  ],
  providers: [TracksService],
  controllers: [TracksController]
})
export class TracksModule {}
