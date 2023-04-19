export class GetUserResponseDto {
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
