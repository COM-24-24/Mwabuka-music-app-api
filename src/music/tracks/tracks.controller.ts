import { Controller, Patch, Get, Delete, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { Role } from 'src/auth/User Roles/roles.enum';
import { Roles } from 'src/auth/User Roles/roles.decorator';

@Controller('tracks')
export class TracksController {
    constructor(private readonly tracksService: TracksService) {}

    @Post()
    @Roles(Role.Admin)
    create( @Body() dto: CreateTrackDto,) {
      return this.tracksService.create(dto);
    }

    @Get()
    @Roles(Role.Admin, Role.Fan)
    findAll() {
        return this.tracksService.findAll();
    }

    @Get(':id')
    @Roles(Role.Admin, Role.Fan)
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.tracksService.findOne(id);
    }

     @Get(':releaseId/tracks')
     @Roles(Role.Admin, Role.Fan)
        findTracks( @Param('releaseId', ParseIntPipe) releaseId: number) {
        return this.tracksService.findTracks(releaseId);
    }

    @Patch(':id')
    @Roles(Role.Admin)
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateTrackDto) {
        return this.tracksService.update(id, dto);
    }

    @Delete(':id')
    @Roles(Role.Admin)
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.tracksService.remove(id);
    }
}
