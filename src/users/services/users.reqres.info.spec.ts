import { UsersInfoService } from './users.Info.service';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Test, TestingModule } from '@nestjs/testing';

describe('UserReqresInfoService', () => {
  let service: UsersInfoService;
  const userService = {
    findById: () => Promise<Observable<AxiosResponse<object>>>,
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

  it('should get From Reqres', async () => {
    expect(await service.findById('2')).toBe(
      Promise<Observable<AxiosResponse<object>>>,
    );
  });
});
