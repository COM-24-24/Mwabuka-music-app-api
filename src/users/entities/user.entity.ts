import { Favorite } from 'src/favorites/entities/favorite.entity';
import { 
    Entity,
    PrimaryGeneratedColumn,
    Column, 
    CreateDateColumn, 
    OneToMany 
  } from 'typeorm';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string = '';

  @Column()
  email: string = '';

  @Column({unique: true})
  password: string = '';

 @Column({
    default: 'user',
  })
  role: string;

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites: Favorite[];

  @CreateDateColumn()
  createdAt: Date;
}