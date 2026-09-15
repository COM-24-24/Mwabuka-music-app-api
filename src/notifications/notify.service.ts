import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entity/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Users } from '../users/entities/user.entity';

@Injectable()
export class NotifyService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async createForUser(
    userId: number,
    createNotificationDto: CreateNotificationDto,
  ): Promise<Notification> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    return this.notificationRepository.save(
      this.notificationRepository.create({
        title: createNotificationDto.title,
        message: createNotificationDto.message,
        type: createNotificationDto.type,
        user,
      }),
    );
  }

  async createAnnouncement(
    createNotificationDto: CreateNotificationDto,
  ): Promise<Notification[]> {
    const users = await this.usersRepository.find();
    const notifications = users.map((user) =>
      this.notificationRepository.create({
        title: createNotificationDto.title,
        message: createNotificationDto.message,
        type: createNotificationDto.type,
        user,
      }),
    );

    return this.notificationRepository.save(notifications);
  }

  async findForUser(userId: number): Promise<Notification[]> {
    return this.notificationRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async markAsRead(
    userId: number,
    notificationId: number,
  ): Promise<Notification> {
    const notification = await this.findOneForUser(userId, notificationId);
    notification.isRead = true;
    return this.notificationRepository.save(notification);
  }

  async removeForUser(
    userId: number,
    notificationId: number,
  ): Promise<{ message: string }> {
    const notification = await this.findOneForUser(userId, notificationId);
    await this.notificationRepository.remove(notification);
    return { message: `Notification ${notificationId} deleted successfully` };
  }

  private async findOneForUser(
    userId: number,
    notificationId: number,
  ): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({
      where: { id: notificationId, user: { id: userId } },
    });

    if (!notification) {
      throw new NotFoundException(`Notification ${notificationId} not found`);
    }

    return notification;
  }

  async findAll(): Promise<Notification[]> {
    return this.notificationRepository.find({
      relations: { user: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({
      where: { id },
      relations: { user: true },
    });

    if (!notification) {
      throw new NotFoundException(`Notification with id ${id} not found`);
    }

    return notification;
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.notificationRepository.delete(id);
    return { message: `Notification ${id} deleted successfully` };
  }
}
