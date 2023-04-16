import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../schemas/user.schema";
import { hashPassword } from "../../utility/hashGeneretors.utility";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EmailService } from "../../emails/email.service";

@Injectable()
export class UsersCreateService {

  constructor(
    @InjectModel(User.name)private userModel: Model<User>,
      private readonly emailService: EmailService,
  ){}
     /*
      Create New User
     */
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const hashedPassword = hashPassword(createUserDto.password);
      createUserDto.password = hashedPassword;
      const user = await this.userModel.create(createUserDto);
      await this.emailService.send(user.email, user.userName);
      return user;
    } catch (e) {
      console.log(e);
    }
  }
}