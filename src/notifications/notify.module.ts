import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotifyService } from './notify.service';
import { NotifyController } from './notify.controller';
import { Notification } from './entity/notification.entity';
import { Users } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notification, Users])],
  providers: [NotifyService],
  controllers: [NotifyController],
  exports: [NotifyService],
})
export class NotifyModule {}
