import { Controller, Patch, Get, Delete, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';

@Controller('tracks')
export class TracksController {
    constructor(private readonly tracksService: TracksService) {}

    @Post()
    create( @Body() dto: CreateTrackDto,) {
      return this.tracksService.create(dto);
    }

    @Get()
    findAll() {
        return this.tracksService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.tracksService.findOne(id);
    }

     @Get(':releaseId/tracks')
        findTracks( @Param('releaseId', ParseIntPipe) releaseId: number) {
        return this.tracksService.findTracks(releaseId);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateTrackDto) {
        return this.tracksService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.tracksService.remove(id);
    }
}
