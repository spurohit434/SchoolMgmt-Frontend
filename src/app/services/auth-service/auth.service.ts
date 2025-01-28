import { Injectable,  OnInit,  inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {LoginResponse} from '../../models/auth.model';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Role } from '../../models/models.model';
import { UserDetails } from '../../models/user.model';
import { BASE_URL } from '../../shared/constants/constants';
import { tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService{
  user$ = signal<UserDetails | null>(null);
  loggedIn$ = signal<boolean>(this.hasValidToken());
  role$ = signal<Role>(Role.student);
  username$ = signal<string>('');

  constructor(
    private httpClient: HttpClient,
  ) {
    if (this.loggedIn$()) {
    // this.fetchAndStoreUserDetails();
    }
  }

  login(username: string, password: string): Observable<LoginResponse> {
    console.log("in service", username, password);
    return this.httpClient.post<LoginResponse>(`${BASE_URL}/authenticate`, {
      username: username,
      password: password,
    });
  }

  hasValidToken(): boolean {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return false;
    }
    try {
      const decodedToken: { exp: number } = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      return decodedToken.exp > currentTime;
    } catch (error) {
      return false;
    }
  }

    //private fetchAndStoreUserDetails() {
    // const userName: string = this.username$();   // Convert signal to string
    // this.httpClient
    //   .get<User>(`${BASE_URL}/users/${userName}`)
    //   .pipe(
    //     tap((response: User) => {
    //       this.loggedIn$.set(true);
    //       // this.user$.set(User);
    //       // this.role$.set(response.user?.role);
    //     })

    //   )
    //   .subscribe();
    // }

}

