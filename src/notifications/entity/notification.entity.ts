import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { NotificationType } from '../enums/notification-type.enum';
import { Users } from '../../users/entities/user.entity';

@Entity()
export class Notification {
  @ApiProperty({
    description: 'Notification ID',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Users, (user) => user.notifications, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user!: Users;

  @ApiProperty({
    description: 'Notification Title',
    example: 'New Message',
  })
  @Column()
  title!: string;

  @ApiProperty({
    description: 'Notification Message',
    example: 'You have a new message.',
  })
  @Column()
  message!: string;

  @ApiProperty({
    description: 'Notification Type',
    enum: NotificationType,
    example: NotificationType.INFO,
  })
  @Column({ type: 'enum', enum: NotificationType })
  type!: NotificationType;

  @ApiProperty({
    description: 'Is Read',
    example: false,
  })
  @Column({ default: false })
  isRead!: boolean;

  @CreateDateColumn({ name: 'CreatedAt' })
  createdAt: Date;

  @CreateDateColumn({ name: 'UpdatedAt' })
  updatedAt: Date;
}
