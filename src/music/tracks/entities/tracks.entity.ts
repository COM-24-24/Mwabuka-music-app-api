import { Column,
        Entity, 
        PrimaryGeneratedColumn, 
        CreateDateColumn,
        OneToMany,  
        ManyToOne
    } from 'typeorm';
import { Release } from '../../release/entites/release.entity';

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
  releaseId: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  UpdatedAt: Date;

  @ManyToOne(() => Release, release => release.tracks)
  release: Release;

}