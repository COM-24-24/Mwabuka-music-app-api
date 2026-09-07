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
import { ReleaseService } from './release.service';
import { CreateReleaseDto } from './dto/create-release.dto';
import { Role } from 'src/auth/User Roles/roles.enum';
import { Roles } from 'src/auth/User Roles/roles.decorator';

@ApiTags('releases')
@Controller('release')
@ApiBearerAuth()
export class ReleaseController {
  constructor(private readonly releaseService: ReleaseService) {}

  @Post()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Create a new release' })
  @ApiResponse({ status: 201, description: 'Release created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 403, description: 'Only admins can create releases' })
  create(@Body() dto: CreateReleaseDto) {
    return this.releaseService.createRelease(dto);
  }

  @Get()
  @Roles(Role.Admin, Role.Fan)
  @ApiOperation({ summary: 'Get all releases' })
  @ApiResponse({ status: 200, description: 'List of all releases' })
  findAll() {
    return this.releaseService.getAllReleases();
  }

  @Get(':id')
  @Roles(Role.Admin, Role.Fan)
  @ApiOperation({ summary: 'Get a release by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Release ID' })
  @ApiResponse({ status: 200, description: 'Release found' })
  @ApiResponse({ status: 404, description: 'Release not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.releaseService.getReleaseById(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Update a release' })
  @ApiParam({ name: 'id', type: 'number', description: 'Release ID' })
  @ApiResponse({ status: 200, description: 'Release updated successfully' })
  @ApiResponse({ status: 404, description: 'Release not found' })
  @ApiResponse({ status: 403, description: 'Only admins can update releases' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateReleaseDto) {
    return this.releaseService.updateRelease(id, dto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Delete a release' })
  @ApiParam({ name: 'id', type: 'number', description: 'Release ID' })
  @ApiResponse({ status: 200, description: 'Release deleted successfully' })
  @ApiResponse({ status: 404, description: 'Release not found' })
  @ApiResponse({ status: 403, description: 'Only admins can delete releases' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.releaseService.deleteRelease(id);
  }
}
