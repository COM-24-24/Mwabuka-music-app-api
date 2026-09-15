import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Patch,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotifyService } from './notify.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Role } from 'src/auth/User Roles/roles.enum';
import { Roles } from 'src/auth/User Roles/roles.decorator';

type AuthenticatedUser = {
  id: number;
};

@ApiTags('notifications')
@Controller('notify')
@ApiBearerAuth()
export class NotifyController {
  constructor(private readonly notifyService: NotifyService) {}

  @Roles(Role.Admin)
  @Post('announcement')
  @ApiOperation({ summary: 'Create a notification' })
  @ApiResponse({
    status: 201,
    description: 'Notification created successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Only admins can create notifications',
  })
  createAnnouncement(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notifyService.createAnnouncement(createNotificationDto);
  }

  @Roles(Role.Admin)
  @Get()
  @ApiOperation({ summary: 'Get all notifications (admin)' })
  @ApiResponse({ status: 200, description: 'List of all notifications' })
  @ApiResponse({
    status: 403,
    description: 'Only admins can view notifications',
  })
  findAll() {
    return this.notifyService.findAll();
  }

  @Roles(Role.Admin, Role.Fan)
  @Get('mine')
  @ApiOperation({ summary: 'Get my notifications' })
  @ApiResponse({ status: 200, description: 'List of your notifications' })
  @ApiResponse({
    status: 403,
    description: 'Only authenticated users can view notifications',
  })
  findMine(@CurrentUser() user: AuthenticatedUser) {
    return this.notifyService.findForUser(user.id);
  }

  @Roles(Role.Admin, Role.Fan)
  @Patch(':id/read')
  @ApiOperation({ summary: 'Mark my notification as read' })
  @ApiParam({ name: 'id', type: 'number', description: 'Notification ID' })
  @ApiResponse({
    status: 200,
    description: 'Notification marked as read',
  })
  @ApiResponse({ status: 404, description: 'Notification not found' })
  @ApiResponse({
    status: 403,
    description: 'Only the notification owner can mark it as read',
  })
  markAsRead(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.notifyService.markAsRead(user.id, id);
  }

  @Roles(Role.Admin, Role.Fan)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete my notification' })
  @ApiParam({ name: 'id', type: 'number', description: 'Notification ID' })
  @ApiResponse({
    status: 200,
    description: 'Notification deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Notification not found' })
  @ApiResponse({
    status: 403,
    description: 'Only the notification owner can delete it',
  })
  remove(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.notifyService.removeForUser(user.id, id);
  }
}
