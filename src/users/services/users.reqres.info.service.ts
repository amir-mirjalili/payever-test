import { map, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersReqresInfoService {
  /*
  This Class contains method that return user info from reqres apis
   */
  constructor(private readonly httpService: HttpService) {}
  async getById(id: string): Promise<Observable<AxiosResponse<object>>> {
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
