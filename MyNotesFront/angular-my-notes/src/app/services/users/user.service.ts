import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import {HttpClient} from "@angular/common/http";
import { environment } from '../../../enviroment/env';
import {Observable} from "rxjs";
import { UserPostDTO } from '../../DTOs/users/userPostDTO';
import { UserGetDTO } from '../../DTOs/users/userGetDTO copy';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersList: UserGetDTO[] = [];

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<UserGetDTO[]> {
    return this.httpClient.get<UserGetDTO[]>(environment.apiHost + 'api/users')
  }
  activateAccount(token: string): Observable<string> {
    return this.httpClient.put<string>(environment.apiHost + 'users/activate/' + token,{});
  }

  register(user: UserPostDTO): Observable<UserPostDTO> {
    return this.httpClient.post<UserPostDTO>(environment.apiHost + 'api/users', user)
  }
}
