import { Column,
        Entity, 
        PrimaryGeneratedColumn, 
        CreateDateColumn,
        OneToMany,  
        ManyToOne
    } from 'typeorm';
import { Release } from '../../release/entites/release.entity';
import { Favorite } from 'src/favorites/entities/favorite.entity';

@Entity('tracks')
export class Tracks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string = '';

  @Column()
  duration: number = 0;

  @Column()
  audioUrl: string = '';

  @Column()
  trackNumber: number = 0;

  @Column()
  releaseId: number;

  @OneToMany(() => Favorite, (favorite) => favorite.track)
  favorites!: Favorite[];

  @CreateDateColumn({name: 'CreatedAt'})
  createdAt: Date;

  @CreateDateColumn({name: 'UpdatedAt'})
  updatedAt: Date;

  @ManyToOne(() => Release, release => release.tracks)
  release: Release;

}