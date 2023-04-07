import { IsEmail, IsOptional, IsDefined } from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  firstName: string;
  @IsDefined()
  lastName: string;
  @IsDefined()
  userName: string;
  @IsEmail()
  @IsDefined()
  email: string;
  @IsOptional()
  birthDate: Date;
  @IsDefined()
  password: string;
  avatar: string;
}
