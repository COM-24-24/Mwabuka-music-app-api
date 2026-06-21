import { Column,
        Entity, 
        PrimaryGeneratedColumn, 
        CreateDateColumn,
        OneToMany,  
        ManyToOne
    } from 'typeorm';
import { Album } from './album.entity';

@Entity('tracks')
export class Tracks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string = '';

  @Column()
  duration: string = '';

  @Column()
  audioUrl: string = '';

  @Column()
  trackNumber: string = '';

  @Column()
  albumId: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  UpdatedAt: Date;

@ManyToOne(() => Album, album => album.tracks)
album: Album;

}