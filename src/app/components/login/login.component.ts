import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../../services/auth-service/auth.service';
import { LoggedResponse, LoginResponse } from '../../models/auth.model';
import { jwtDecode } from 'jwt-decode';
import { NgIf } from '@angular/common';
import {ButtonModule} from 'primeng/button';
import { HeaderComponent } from "../header/header.component";
 

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true
})
export class LoginComponent {

  form = new FormGroup({
    username: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(private authService: AuthService, private router: Router) {
  }

    onSubmit(): void{
      if(this.form.valid){
      const username = this.form.value.username!;
      const password = this.form.value.password!;
      console.log(username, password);
      this.authService.login(username, password).subscribe({
        next: (response : LoggedResponse): void => {
          console.log(response.data["JWT Token"]);
          localStorage.setItem('authToken', response.data["JWT Token"]);
          const decodedToken:any = jwtDecode(response.data["JWT Token"]);
          const role = decodedToken['role']; 
          this.authService.role$.set(role);
          this.authService.username$.set(decodedToken['username']);
  
          if (role === 'ROLE_ADMIN') {
            this.router.navigate(['admin/home']);
          } 
          else if (role === 'ROLE_STUDENT') {
            this.router.navigate(['student/home']);
          }
          else if (role === 'ROLE_FACULTY') {
            this.router.navigate(['faculty/home']);
          }
        },
        error: (error) => {
          console.error('Error:', error);
          alert('Invalid credentials');
        },
      },
      );
      this.form.reset();
      }
    }
}
