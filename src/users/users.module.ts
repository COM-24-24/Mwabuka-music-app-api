import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { Users } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}