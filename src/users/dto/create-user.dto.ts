import { IsEmail, IsOptional, IsDefined, IsString } from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @IsString()
  firstName: string;
  @IsDefined()
  @IsString()
  lastName: string;
  @IsDefined()
  @IsString()
  userName: string;
  @IsEmail()
  @IsDefined()
  @IsString()
  email: string;
  @IsOptional()
  birthDate: Date;
  @IsDefined()
  @IsString()
  password: string;
  avatar: string;
}
