import { UsersCreateService } from './users.create.service';
import { User } from '../schemas/user.schema';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserRequestDto } from '../dto/create-user.request.dto';

describe('UserCreateService', () => {
  let service: UsersCreateService;
  const userService = {
    create: () => User,
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersCreateService],
    })
      .overrideProvider(UsersCreateService)
      .useValue(userService)
      .compile();

    service = module.get<UsersCreateService>(UsersCreateService);
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
  });

  it('should create user', () => {
    const data = new CreateUserRequestDto();
    data.userName = 'a';
    data.password = '1234';
    data.birthDate = new Date();
    data.email = 'amir@gmail.com';
    data.firstName = 'Amir';
    data.lastName = 'Mirjalili';
    expect(service.create(data)).toBe(User);
  });
});
