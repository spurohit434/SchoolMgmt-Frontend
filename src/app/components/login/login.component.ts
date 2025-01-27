import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../../services/auth-service/auth.service';
import { LoggedResponse, LoginResponse } from '../../models/auth.model';
import { jwtDecode } from 'jwt-decode';
import { NgClass, NgIf } from '@angular/common';
import {ButtonModule} from 'primeng/button';
import { HeaderComponent } from "../header/header.component";
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
 

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf, ButtonModule, FloatLabelModule, PasswordModule, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  providers: [MessageService]  // Injecting MessageService to display error messages in the component.  This service is provided in the AppModule.  It can be injected in any component that needs to display error messages.  In this case, we are injecting it in the LoginComponent.  The MessageService provides methods for displaying messages (success, info, warn, error) to the user.  The messages will be displayed on the page where the MessageService is injected.
})
export class LoginComponent {

  form = new FormGroup({
    username: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) {
  }

  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
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
        error: (error: HttpErrorResponse) => {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Invalid Credentials'});
        },
      },
      );
      this.form.reset();
      }
    }
}
