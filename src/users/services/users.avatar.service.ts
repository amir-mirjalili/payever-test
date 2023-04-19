import { Injectable } from '@nestjs/common';
import { User } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetUserResponseDto } from '../dto/get-user.response.dto';

@Injectable()
export class UsersAvatarService {
  /*
  This Class contains methods for avatar of user
   */
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async removeAvatar(id: string): Promise<GetUserResponseDto> {
    try {
      const user = await this.userModel.findOneAndUpdate(
        { _id: id },
        { avatar: '' },
        { new: false },
      );
      return new GetUserResponseDto({
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
        avatar: user.avatar,
        birthDate: user.birthDate,
        password: user.password,
      });
    } catch (e) {
      console.log(e);
    }
  }
}
