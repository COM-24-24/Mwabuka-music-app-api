import { create } from 'domain';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId!: number;

  @Column()
  title!: string;

  @Column()
  message!: string;

  @Column()
  type!: string;

  @Column()
  isRead!: boolean;

  @CreateDateColumn({ name: 'CreatedAt' })
  createdAt: Date;

  @CreateDateColumn({ name: 'UpdatedAt' })
  updatedAt: Date;
}
