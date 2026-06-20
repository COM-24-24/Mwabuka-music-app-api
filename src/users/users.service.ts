import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor (
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<Users> {
    const user = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(user);
    }

    async findAll(): Promise<Users[]> {
    return await this.usersRepository.find();
    }

    async findOne(id: number): Promise<Users> {
    const user = await this.usersRepository.findOne({ where: {id} });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<Users> { 
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    return await this.usersRepository.save(user); 
    } 

    async remove(id: number): Promise<{ message: string }> { 
    await this.findOne(id); 
    await this.usersRepository.delete(id); 
    return { message: `User ${id} deleted successfully` }; 
  }

  async findByEmail(email: string): Promise<Users | null> {
    return await this.usersRepository.findOne({ where: { email } });
  }
}

