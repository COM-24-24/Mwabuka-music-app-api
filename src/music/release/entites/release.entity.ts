import { Column,
        Entity, 
        PrimaryGeneratedColumn, 
        CreateDateColumn,
        OneToMany 
    } from 'typeorm';
import { Tracks } from '../../tracks/entities/tracks.entity';

@Entity('release')
export class Release {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string = '';

  @Column()
  description: string = '';

  @Column()
  coverImage: string = '';

  @Column()
  releaseDate: string = '';

  @CreateDateColumn({name: 'CreatedAt'})
  createdAt: Date;

  @CreateDateColumn({name: 'UpdatedAt'})
  updatedAt: Date;

  @OneToMany(() => Tracks, track => track.release)
  tracks: Tracks[];

}