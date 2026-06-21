import { Column,
        Entity, 
        PrimaryGeneratedColumn, 
        CreateDateColumn,
        OneToMany 
    } from 'typeorm';
import { Tracks } from './tracks.entity';

@Entity('albums')
export class Album {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string = '';

  @Column()
  description: string = '';

  @Column()
  coverImage: string = '';

  @Column()
  releaseDate: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  UpdatedAt: Date;

  @OneToMany(() => Tracks, track => track.album)
  tracks: Tracks[];

}