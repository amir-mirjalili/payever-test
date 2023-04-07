import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { EmailService } from '../emails/email.service';
import { hashPassword } from '../utility/hashGeneretors.utility';
import { generateRandomCode } from '../utility/randomGenerator.utility';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly emailService: EmailService,
    private readonly httpService: HttpService,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const password = await generateRandomCode(6);
      const hashedPassword = hashPassword(password.toString());
      createUserDto.password = hashedPassword;
      const user = await this.userModel.create(createUserDto);
      await this.emailService.send(user.email, user.userName);
      return user;
    } catch (e) {
      console.log(e);
    }
  }
  async findFromReqresById(
    id: string,
  ): Promise<Observable<AxiosResponse<object>>> {
    try {
      const response = await this.httpService
        .get(`https://reqres.in/api/users/${id}`)
        .pipe(
          map((axiosResponse: AxiosResponse) => {
            return axiosResponse.data;
          }),
        );
      return response;
    } catch (e) {
      console.log(e);
    }
  }
}
