import { Injectable } from '@nestjs/common';
import { User } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersAvatarService {
  /*
  This Class contains methods for avatar of user
   */
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async removeAvatar(id: string): Promise<any> {
    try {
      await this.userModel.updateOne(
        { _id: id },
        { avatar: '' },
        { new: true },
      );
    } catch (e) {
      console.log(e);
    }
  }
}
