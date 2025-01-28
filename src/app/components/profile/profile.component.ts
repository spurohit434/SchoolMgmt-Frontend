import { Component } from '@angular/core';
import { UserService } from '../../services/user-service/user.service';
import { UserDetails, UserResponse, UpdateUser } from '../../models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { ButtonModule } from 'primeng/button';
import { FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { LoggedResponse} from '../../models/auth.model';

@Component({
  selector: 'app-profile',
  imports: [ButtonModule, NgIf, NgClass, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  
  constructor(private userService: UserService){
  }
  ngOnInit(){
    const token = localStorage.getItem('authToken') as string;
    const decodedToken:any = jwtDecode(token) ;
    this.username = decodedToken['sub'];
    this.getProfile();
  }

  user: UserDetails = {
    userId: '',
    name: '',
    age: 0,
    role: '',
    gender: '',
    username: '',
    address: '',
    email: '',
    mentorOf: 0,
    standard: 0
  };
  username: string = '';
  isModalOpen = false;  // Modal visibility state
  

  form = new FormGroup({
      name: new FormControl('', [Validators.minLength(1)]),
      username: new FormControl('', [ Validators.minLength(4)]),
      password: new FormControl(''),
      email: new FormControl('', [ Validators.email]),
      age: new FormControl(0 , [Validators.min(0), Validators.max(120)]),
      address: new FormControl('', [Validators.minLength(0), Validators.maxLength(120)]), // Adding address field
  });


   // Opens the modal
   openEditUserModal(): void {
    this.isModalOpen = true;
  }

  // Closes the modal
  closeEditUserModal(): void {
    this.isModalOpen = false;
  }

  getProfile(){
    this.userService.getUserByUsername(this.username).subscribe({
      next: (response: UserResponse) => {
        this.user = response.data;
        this.form.patchValue(this.user);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching user:', error);
      }
    });
  }

  editUser(){
    if(this.form.valid){
      const name = this.form.value.name as string;
      const address = this.form.value.address as string;
      const age = this.form.value.age as number;
      const email = this.form.value.email as string;
      const password = this.form.value.password as string;
      const updatedUser: UpdateUser = {name, address, age, email, password};
      if(password?.length! < 8 ){
        delete updatedUser.password;
      }
      this.userService.editUser(this.user.userId, updatedUser).subscribe({
        next: (response: LoggedResponse) => {
          console.log(response);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      });
    }
  }
}