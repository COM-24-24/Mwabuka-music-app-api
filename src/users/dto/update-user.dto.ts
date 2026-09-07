import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { Role } from 'src/auth/User Roles/roles.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({
    description: 'User role',
    enum: Role,
    example: Role.Fan,
  })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
