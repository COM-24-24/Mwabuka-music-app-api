import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { NotificationType } from '../enums/notification-type.enum';

export class CreateNotificationDto {
  @ApiProperty({
    description: 'Notification Type',
    enum: NotificationType,
    example: NotificationType.INFO,
  })
  @IsEnum(NotificationType)
  @IsNotEmpty()
  type!: NotificationType;

  @ApiProperty({
    description: 'Notification title',
    example: 'New Message',
  })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty({
    description: 'Notification message',
    example: 'You have a new message.',
  })
  @IsNotEmpty()
  @IsString()
  message!: string;
}
