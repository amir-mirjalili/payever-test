import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { AxiosResponse } from 'axios/index';
import { Observable } from 'rxjs';

describe('UsersService', () => {
  let service: UsersService;
  const userService = {
    create: () => User,
    findFromReqresById: () => Promise<Observable<AxiosResponse<object>>>,
    removeAvatar: () => User,
    findById: () => User,
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(userService)
      .compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
  });

  it('should create user', () => {
    const data = new CreateUserDto();
    data.userName = 'a';
    data.password = '1234';
    data.birthDate = new Date();
    data.email = 'amir@gmail.com';
    data.firstName = 'Amir';
    data.lastName = 'Mirjalili';
    expect(service.create(data)).toBe(User);
  });

  it('should get From Reqres', async () => {
    expect(await service.findFromReqresById('2')).toBe(
      Promise<Observable<AxiosResponse<object>>>,
    );
  });

  it('should removeAvatar', async () => {
    expect(await service.removeAvatar('1')).toBe(User);
  });

  it('should findById', async () => {
    expect(await service.findById('1')).toBe(User);
  });
});
