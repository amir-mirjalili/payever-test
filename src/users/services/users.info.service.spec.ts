import { Test, TestingModule } from '@nestjs/testing';
import { UsersInfoService } from './users.Info.service';
import { User } from '../schemas/user.schema';

describe('UsersInfoService', () => {
  let service: UsersInfoService;
  const userService = {
    findById: () => User,
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersInfoService],
    })
      .overrideProvider(UsersInfoService)
      .useValue(userService)
      .compile();

    service = module.get<UsersInfoService>(UsersInfoService);
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
  });

  it('should findById', async () => {
    expect(await service.findById('1')).toBe(User);
  });
});
