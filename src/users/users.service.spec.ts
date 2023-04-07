import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { EmailModule } from '../emails/email.module';
import { HttpModule } from '@nestjs/axios';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EmailModule, HttpModule],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create user', () => {
    const data = new CreateUserDto();
    data.userName;
    data.password;
    data.birthDate;
    data.email;
    data.firstName;
    data.lastName;
    expect(service.create(data)).toBe('object');
  });

  it('should get From Reqres', () => {
    expect(service.findFromReqresById('2')).toBe('object');
  });

  it('should removeAvatar', () => {
    expect(service.removeAvatar('1')).toBeCalled();
  });

  it('should findById', () => {
    expect(service.findById('1')).toBeCalled();
  });
});
