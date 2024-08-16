import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import {HttpClient} from "@angular/common/http";
import { environment } from '../../../enviroment/env';
import {Observable} from "rxjs";
import { UserPostDTO } from '../../DTOs/users/userPostDTO';
import { UserGetDTO } from '../../DTOs/users/userGetDTO copy';
import { Login } from '../../models/login';
import { UserPutDTO } from '../../DTOs/users/userPutDTO';

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

  register(user: UserPostDTO): Observable<UserPostDTO> {
    return this.httpClient.post<UserPostDTO>(environment.apiHost + 'api/users', user)
  }
  login(credentials: Login): Observable<any> {
    return this.httpClient.post(environment.apiHost+'api/users/authenticate', credentials);
  }
  update(user: UserPutDTO,id:number): Observable<User> {
    return this.httpClient.put<User>(environment.apiHost + 'api/users/editUser/' + id,user)
  }
  getById(id: any): Observable<UserGetDTO> {
    return this.httpClient.get<UserGetDTO>(environment.apiHost + 'api/users/by-id/'+id)
  }
}
