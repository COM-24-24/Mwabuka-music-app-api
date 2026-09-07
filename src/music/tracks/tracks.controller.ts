import {
  Controller,
  Patch,
  Get,
  Delete,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { Role } from 'src/auth/User Roles/roles.enum';
import { Roles } from 'src/auth/User Roles/roles.decorator';

@ApiTags('tracks')
@Controller('tracks')
@ApiBearerAuth()
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Create a new track' })
  @ApiResponse({ status: 201, description: 'Track created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 403, description: 'Only admins can create tracks' })
  create(@Body() dto: CreateTrackDto) {
    return this.tracksService.create(dto);
  }

  @Get()
  @Roles(Role.Admin, Role.Fan)
  @ApiOperation({ summary: 'Get all tracks' })
  @ApiResponse({ status: 200, description: 'List of all tracks' })
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin, Role.Fan)
  @ApiOperation({ summary: 'Get a track by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Track ID' })
  @ApiResponse({ status: 200, description: 'Track found' })
  @ApiResponse({ status: 404, description: 'Track not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tracksService.findOne(id);
  }

  @Get(':releaseId/tracks')
  @Roles(Role.Admin, Role.Fan)
  @ApiOperation({ summary: 'Get all tracks for a release' })
  @ApiParam({ name: 'releaseId', type: 'number', description: 'Release ID' })
  @ApiResponse({ status: 200, description: 'List of tracks for the release' })
  @ApiResponse({ status: 404, description: 'Release not found' })
  findTracks(@Param('releaseId', ParseIntPipe) releaseId: number) {
    return this.tracksService.findTracks(releaseId);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Update a track' })
  @ApiParam({ name: 'id', type: 'number', description: 'Track ID' })
  @ApiResponse({ status: 200, description: 'Track updated successfully' })
  @ApiResponse({ status: 404, description: 'Track not found' })
  @ApiResponse({ status: 403, description: 'Only admins can update tracks' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateTrackDto) {
    return this.tracksService.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Delete a track' })
  @ApiParam({ name: 'id', type: 'number', description: 'Track ID' })
  @ApiResponse({ status: 200, description: 'Track deleted successfully' })
  @ApiResponse({ status: 404, description: 'Track not found' })
  @ApiResponse({ status: 403, description: 'Only admins can delete tracks' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tracksService.remove(id);
  }
}
