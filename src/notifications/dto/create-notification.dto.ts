import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { NotificationType } from '../enums/notification-type.enum';

export class CreateNotificationDto {
  @ApiProperty({
    description: 'ID of the user receiving the notification',
    example: 1,
  })
  @IsInt()
  userId!: number;

  @ApiProperty({
    description: 'Notification Type',
    enum: NotificationType,
    example: NotificationType.INFO,
  })
  @IsEnum(NotificationType)
  @IsNotEmpty()
  type!: NotificationType;

  @ApiProperty({
    description: 'Notification message',
    example: 'You have a new message.',
  })
  @IsNotEmpty()
  @IsString()
  message!: string;

  @ApiProperty({
    description: 'Notification title',
    example: 'New Message',
  })
  @IsNotEmpty()
  @IsString()
  title!: string;
}
