import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsersInfoService } from './services/users.Info.service';
import { CreateUserRequestDto } from './dto/create-user.request.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as fs from 'fs';
import { createReadStream } from 'fs';
import { UsersCreateService } from './services/users.create.service';
import { UsersAvatarService } from './services/users.avatar.service';
import { UsersReqresInfoService } from './services/users.reqres.info.service';
import { response } from 'express';

@Controller('api/users')
export class UsersController {
  constructor(
    private readonly usersInfoService: UsersInfoService,
    private readonly usersCreateService: UsersCreateService,
    private readonly usersAvatarService: UsersAvatarService,
    private readonly usersReqresInfoService: UsersReqresInfoService,
  ) {}
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
    @Body() body: CreateUserRequestDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    body.avatar = file ? file.filename : '';
    const response = await this.usersCreateService.create(body);
    if (response) return response;
    throw new HttpException('This user is duplicated', HttpStatus.CONFLICT);
  }
  @Get(':userId')
  async findById(@Param() params) {
    const response = await this.usersReqresInfoService.getById(params.userId);
    if (response) return response;
    throw new HttpException('no result', HttpStatus.NOT_FOUND);
  }

  @Get(':userId/avatar')
  async getFile(@Param() params): Promise<StreamableFile> | null {
    const user = await this.usersInfoService.findById(params.userId);
    if (user.avatar) {
      const file = createReadStream(
        join(process.cwd(), `/uploads/${user.avatar}`),
      );
      return new StreamableFile(file);
    }
    return null;
  }

  @Delete(':userId/avatar')
  async removeFile(@Param() params) {
    const response = await this.usersAvatarService.removeAvatar(params.userId);
    fs.unlinkSync(join(process.cwd(), `/uploads/${response.avatar}`));
    return 'removed';
  }
}
