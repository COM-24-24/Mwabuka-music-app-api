import { Favorite } from '../../favorites/entities/favorite.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Notification } from '../../notifications/entity/notification.entity';
import { Role } from '../../auth/User Roles/roles.enum';

@Entity('users')
export class Users {
  @ApiProperty({
    description: 'User ID',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({
    description: 'User Name',
    example: 'John Doe',
  })
  @Column()
  name: string = '';

  @ApiProperty({
    description: 'User Email',
    example: 'john.doe@example.com',
  })
  @Column()
  email: string = '';

  @ApiProperty({
    description: 'User Password',
    example: 'hashed-password',
  })
  @Column({ unique: true })
  password: string = '';

  @ApiProperty({
    description: 'User Role',
    example: 'fan',
  })
  @Column({
    default: 'fan',
  })
  role!: Role;

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites!: Favorite[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications!: Notification[];

  @CreateDateColumn()
  createdAt!: Date;
}
