import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Post()
  async create(@Body() body: CreateUserDto, @Res() res: Response) {
    const response = await this.userService.create(body);
    return response;
  }
  @Get(':userId')
  async findById(@Param() params) {
    const response = await this.userService.findFromReqresById(params.userId);
    return response;
  }
}
