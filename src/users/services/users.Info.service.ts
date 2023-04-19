import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { GetUserResponseDto } from '../dto/get-user.response.dto';

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
  async findById(id: string): Promise<GetUserResponseDto> {
    try {
      const user = await this.userModel.findById(id);
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
