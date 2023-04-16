import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersInfoService } from './services/users.Info.service';
import { User, UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailModule } from '../emails/email.module';
import { HttpModule } from '@nestjs/axios';
import { MulterModule } from '@nestjs/platform-express';
import { UsersCreateService } from './services/users.create.service';
import { UsersReqresInfoService } from './services/users.reqres.info.service';
import { UsersAvatarService } from './services/users.avatar.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    EmailModule,
    HttpModule,
    MulterModule.register({ dest: './uploads' }),
  ],
  controllers: [UsersController],
  providers: [
    UsersInfoService,
    UsersCreateService,
    UsersReqresInfoService,
    UsersAvatarService,
  ],
})
export class UsersModule {}
