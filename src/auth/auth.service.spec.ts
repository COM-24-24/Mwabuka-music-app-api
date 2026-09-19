import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { NotifyService } from '../notifications/notify.service';
import { Role } from './User Roles/roles.enum';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: { findByEmail: jest.Mock; create: jest.Mock };
  let jwtService: { sign: jest.Mock };
  let notifyService: { createForUser: jest.Mock };

  beforeEach(async () => {
    usersService = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    };

    jwtService = {
      sign: jest.fn().mockReturnValue('jwt-token'),
    };

    notifyService = {
      createForUser: jest.fn().mockResolvedValue({ id: 1 }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
        { provide: NotifyService, useValue: notifyService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a welcome notification for every new signup', async () => {
    usersService.findByEmail.mockResolvedValue(null);
    usersService.create.mockResolvedValue({
      id: 1,
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'hashed',
      role: Role.Fan,
    });

    await service.signup({
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'Password123',
    });

    expect(notifyService.createForUser).toHaveBeenCalledWith(1, {
      title: 'Welcome',
      message:
        'Welcome to Mwabuka music platform and thank you for your support.',
      type: 'INFO',
    });
  });
});
