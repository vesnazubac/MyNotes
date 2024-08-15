import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../../models/login';
import { environment } from '../../../enviroment/env';
import jwtDecode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

interface JwtPayload {
  id: string;
  exp?: number;
  iat?: number;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken'
  helper = new JwtHelperService();
  constructor(private httpClient: HttpClient,private router:Router) {}
  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['login']);
  }
  login(credentials: Login): Observable<any> {
    return this.httpClient.post(environment.apiHost+'api/users/authenticate', credentials);
  }
  getUserIdFromToken(): string | null {
    const token :any= this.getToken();
    const helper = new JwtHelperService();
    const decodedToken = this.helper.decodeToken(token);
    if(decodedToken){
      return decodedToken.id;
    }
    return null;
  }
  isLoggedIn():boolean{
    if(localStorage.getItem('authToken')){
      return true;
    }else{
      return false;
    }
  }
}
