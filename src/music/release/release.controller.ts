import { Controller, Patch, Get, Delete, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ReleaseService } from './release.service';
import { CreateReleaseDto } from './dto/create-release.dto';
import { Role } from 'src/auth/User Roles/roles.enum';
import { Roles } from 'src/auth/User Roles/roles.decorator';

@Controller('release')
export class ReleaseController {
    constructor(private readonly releaseService: ReleaseService) {}

    @Post()
    @Roles(Role.Admin)
    create(
       @Body() dto: CreateReleaseDto) {
         return this.releaseService.createRelease(dto);
    }

    @Get()
    @Roles(Role.Admin, Role.Fan)
    findAll() {
        return this.releaseService.getAllReleases();
    }

    @Get(':id')
    @Roles(Role.Admin, Role.Fan)
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.releaseService.getReleaseById(id);
    }

    @Patch(':id')
    @Roles(Role.Admin)
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateReleaseDto) {
        return this.releaseService.updateRelease(id, dto);
    }

    @Delete(':id')
    @Roles(Role.Admin)
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.releaseService.deleteRelease(id);
    }
}
