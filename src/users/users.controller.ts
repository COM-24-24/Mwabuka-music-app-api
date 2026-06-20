import { Controller, Patch, Get, Delete, Post, Body, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto'; 
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { Role } from 'src/auth/User Roles/roles.enum';
import { Roles } from 'src/auth/User Roles/roles.decorator';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Public()
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
    }

    @Get()
    findAll() {
    return this.usersService.findAll();
    }

    @Roles(Role.Admin)
    @Get(':id')
    findOne(@Param('id') id: string) {
        console.log(`Retrieving user with ID: ${id}`);
    return this.usersService.findOne(+id);
    }

    @Roles(Role.Admin)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
    }

    @Roles(Role.Admin)
    @Delete(':id')
    remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
    }
}
