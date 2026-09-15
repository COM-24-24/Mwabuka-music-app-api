import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Users } from '../../users/entities/user.entity';
import { Tracks } from '../../music/tracks/entities/tracks.entity';

@Entity('favorites')
export class Favorite {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Users, (user) => user.favorites)
  user!: Users;

  @ManyToOne(() => Tracks, (track) => track.favorites)
  track!: Tracks;

  @CreateDateColumn()
  createdAt!: Date;
}
