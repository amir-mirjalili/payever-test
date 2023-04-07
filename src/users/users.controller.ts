import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { createReadStream } from 'fs';
import { join } from 'path';
import * as fs from 'fs';

@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Post()
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async create(
    @Body() body: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    body.avatar = file.filename;
    const response = await this.userService.create(body);
    return response;
  }
  @Get(':userId')
  async findById(@Param() params) {
    const response = await this.userService.findFromReqresById(params.userId);
    return response;
  }

  @Get(':userId/avatar')
  async getFile(@Param() params): Promise<StreamableFile> {
    const user = await this.userService.findById(params.userId);
    const file = createReadStream(
      join(process.cwd(), `/uploads/${user.avatar}`),
    );
    return new StreamableFile(file);
  }

  @Delete(':userId/avatar')
  async removeFile(@Param() params) {
    const response = await this.userService.removeAvatar(params.userId);
    fs.unlinkSync(join(process.cwd(), `/uploads/${response.avatar}`));
    return 'removed';
  }
}
