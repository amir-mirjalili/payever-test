import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersInfoService } from './services/users.Info.service';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersCreateService } from './services/users.create.service';
import { UsersAvatarService } from './services/users.avatar.service';
import { UsersReqresInfoService } from './services/users.reqres.info.service';
import { GetUserReqresResponseDto } from './dto/get-user-reqres.response.dto';
import { GetUserResponseDto } from './dto/get-user.response.dto';
import { CreateUserResponseDto } from './dto/create-user.response.dto';

describe('UsersController', () => {
  let app: INestApplication;
  let controller: UsersController;

  const mockUserService = {
    getById: () => Promise<GetUserReqresResponseDto>,
    findById: () => Promise<GetUserResponseDto>,
    removeAvatar: () => Promise<GetUserResponseDto>,
    create: () => Promise<CreateUserResponseDto>,
  };
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersInfoService,
        { provide: UsersInfoService, useValue: mockUserService },
        UsersCreateService,
        { provide: UsersCreateService, useValue: mockUserService },
        UsersAvatarService,
        { provide: UsersAvatarService, useValue: mockUserService },
        UsersReqresInfoService,
        { provide: UsersReqresInfoService, useValue: mockUserService },
      ],
    }).compile();
    controller = module.get<UsersController>(UsersController);

    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should create user', () => {
    expect(
      controller.create(
        {
          userName: 'a',
          password: '1234',
          birthDate: new Date(),
          email: 'amir@gmail.com',
          firstName: 'Amir',
          lastName: 'Mirjalili',
          avatar: '',
        },
        undefined,
      ),
    ).toBeDefined();
  });
  it('GET avatar', async () => {
    //return 400 because there is no any avatar!
    return request(app.getHttpServer()).get('/api/users/1/avatar').expect(200);
  });

  it('GET user', () => {
    return request(app.getHttpServer()).get('/api/users/1').expect(200);
  });
  afterAll(async () => {
    await app.close();
  });
});
