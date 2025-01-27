import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formInput, UserResponse} from '../../models/user.model';
import { BASE_URL } from '../../shared/constants/constants';
import { LoginResponse } from '../../models/auth.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  addUser(userDetails: formInput): Observable<any> {
    console.log(userDetails);
    return this.httpClient.post<Response>(`${BASE_URL}/user`, 
          userDetails);
  }

  getAllUsers(): Observable<LoginResponse>{
    return this.httpClient.get<LoginResponse>(`${BASE_URL}/users`);
  }

  getAllUsers1(page: number, size: number): Observable<LoginResponse>{
    return this.httpClient.get<LoginResponse>(`${BASE_URL}/users?page=${page}&size=${size}`);
  }

  deleteUser(userId: string): Observable<Response>{
    return this.httpClient.delete<Response>(`${BASE_URL}/user/${userId}`, {});
  }

  getUserByUsername(username: string): Observable<UserResponse>{
    return this.httpClient.get<UserResponse>(`${BASE_URL}/user/${username}`);
  }

  updateUser(userDetails: formInput): Observable<Response>{
    return this.httpClient.put<Response>(`${BASE_URL}/user`, 
          userDetails);
  }
}