import { User } from '../schemas/user.schema';

export class CreateUserResponseDto {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  birthDate: Date;
  password: string;
  avatar: string;
  constructor(user: {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    birthDate: Date;
    password: string;
    avatar: string;
  }) {
    Object.assign(this, user);
  }
}
