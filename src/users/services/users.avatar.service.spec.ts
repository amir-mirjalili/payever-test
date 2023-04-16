import { User } from '../schemas/user.schema';
import { UsersAvatarService } from './users.avatar.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('UsersAvatarService', () => {
  let service: UsersAvatarService;
  const avatarService = {
    removeAvatar: () => User,
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersAvatarService],
    })
      .overrideProvider(UsersAvatarService)
      .useValue(avatarService)
      .compile();

    service = module.get<UsersAvatarService>(UsersAvatarService);
  });
  it('should be defined', async () => {
    expect(service).toBeDefined();
  });
  it('should removeAvatar', async () => {
    expect(await service.removeAvatar('1')).toBe(User);
  });
});
