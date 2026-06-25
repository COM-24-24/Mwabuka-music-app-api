import { Controller, Patch, Get, Delete, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ReleaseService } from './release.service';
import { CreateReleaseDto } from './dto/create-release.dto';

@Controller('release')
export class ReleaseController {
    constructor(private readonly releaseService: ReleaseService) {}

    @Post()
    create(
       @Body() dto: CreateReleaseDto) {
         return this.releaseService.createRelease(dto);
    }

    @Get()
    findAll() {
        return this.releaseService.getAllReleases();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.releaseService.getReleaseById(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateReleaseDto) {
        return this.releaseService.updateRelease(id, dto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.releaseService.deleteRelease(id);
    }
}
