import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { GetUserReqresResponseDto } from '../dto/get-user-reqres.response.dto';

@Injectable()
export class UsersReqresInfoService {
  /*
  This Class contains method that return user info from reqres apis
   */
  constructor(private readonly httpService: HttpService) {}
  async getById(id: string): Promise<GetUserReqresResponseDto> {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`https://reqres.in/api/users/${id}`),
      );
      return new GetUserReqresResponseDto({
        id: response.data.data.id,
        email: response.data.data.email,
        first_name: response.data.data.first_name,
        last_name: response.data.data.last_name,
        avatar: response.data.data.avatar,
      });
    } catch (e) {
      console.log(e);
    }
  }
}
