import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { Users } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Role } from './User Roles/roles.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

   async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  async signup(createUserDto: CreateUserDto): Promise<{
    user: Users;
    access_token: string
  }> {
    // Check if email already exists
    const existingUser = await this.usersService.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    const hashedPassword = await this.hashPassword(createUserDto.password);

    const user = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const access_token = this.jwtService.sign(
      { sub: user.id, email: user.email, roles: [user.role] },
      { expiresIn: '24h' },
    );

    return { user, access_token };
  }

    async signin(email: string, password: string): Promise<{
    user: Users;
    access_token: string;
  }> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await this.comparePassword(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const access_token = this.jwtService.sign(
      { sub: user.id, email: user.email, roles: [user.role] },
      { expiresIn: '24h' },
    );

    return { user, access_token };
  }

   async validateToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}