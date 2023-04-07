import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  // it('create method should be defined', () => {
  //   expect(controller.create(new CreateUserDto())).toBeDefined();
  // });
  it('getFile method should be defined', () => {
    expect(controller.getFile('2')).toBeDefined();
  });

  it('removeFile method should be defined', () => {
    expect(controller.removeFile('2')).toBeDefined();
  });
});
