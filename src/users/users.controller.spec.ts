import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { User } from './schemas/user.schema';

describe('UsersController', () => {
  let app: INestApplication;
  let controller: UsersController;

  const mockUserService = {
    findFromReqresById: () => Promise<Observable<AxiosResponse<object>>>,
    findById: () => Promise<User>,
    removeAvatar: () => Promise<User>,
    create: () => Promise<User>,
  };
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      .compile();
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
