import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Release } from './entites/release.entity';
import { ReleaseService } from './release.service';
import { NotifyService } from '../../notifications/notify.service';

describe('ReleaseService', () => {
  let service: ReleaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReleaseService,
        {
          provide: getRepositoryToken(Release),
          useValue: {},
        },
        {
          provide: NotifyService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ReleaseService>(ReleaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
