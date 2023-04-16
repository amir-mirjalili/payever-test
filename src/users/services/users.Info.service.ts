import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';

@Injectable()
export class UsersInfoService {
  /*
    This class contains methods for get user data
   */
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  /*
  Get User Info By id
  @param id
   */
  async findById(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id);
      return user;
    } catch (e) {
      console.log(e);
    }
  }
}
