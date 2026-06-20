import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { Role } from 'src/auth/User Roles/roles.enum';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreateUserDto {
    @PrimaryGeneratedColumn()
    id!: number;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;
}