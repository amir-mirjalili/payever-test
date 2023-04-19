import { Injectable } from '@nestjs/common';
import { CreateUserRequestDto } from '../dto/create-user.request.dto';
import { User } from '../schemas/user.schema';
import { hashPassword } from '../../utility/hashGeneretors.utility';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailService } from '../../emails/email.service';
import { CreateUserResponseDto } from '../dto/create-user.response.dto';

@Injectable()
export class UsersCreateService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly emailService: EmailService,
  ) {}
  /*
      Create New User
     */
  async create(
    createUserDto: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    try {
      const hashedPassword = hashPassword(createUserDto.password);
      createUserDto.password = hashedPassword;
      const user = await this.userModel.create(createUserDto);
      await this.emailService.send(user.email, user.userName);
      return new CreateUserResponseDto({
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
