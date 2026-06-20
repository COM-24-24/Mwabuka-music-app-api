import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { Role } from 'src/auth/User Roles/roles.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    role?: Role;
}