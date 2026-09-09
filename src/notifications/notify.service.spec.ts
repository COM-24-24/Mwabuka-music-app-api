import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Notification } from './entity/notification.entity';
import { NotifyService } from './notify.service';
import { Users } from '../users/entities/user.entity';

describe('NotifyService', () => {
  let service: NotifyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotifyService,
        {
          provide: getRepositoryToken(Notification),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Users),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<NotifyService>(NotifyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
