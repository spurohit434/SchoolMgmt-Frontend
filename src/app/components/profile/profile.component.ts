import { Component } from '@angular/core';
import { UserService } from '../../services/user-service/user.service';
import { UserDetails, UserResponse } from '../../models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { ButtonModule } from 'primeng/button';
import { FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [ButtonModule, NgIf, NgClass, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

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
      name: new FormControl('', [Validators.required, Validators.minLength(1)]),
      role: new FormControl('', Validators.required),
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      age: new FormControl(0 , [Validators.required, Validators.min(0), Validators.max(120)]),
      gender: new FormControl('this.user.gender', Validators.required), // Default to 'male'
      address: new FormControl('', Validators.required), // Adding address field
  });


  constructor(private userService: UserService){
  }

   // Opens the modal
   openEditUserModal(): void {
    this.isModalOpen = true;
  }

  // Closes the modal
  closeEditUserModal(): void {
    this.isModalOpen = false;
  }

  ngOnInit(){
    const token = localStorage.getItem('authToken') as string;
    const decodedToken:any = jwtDecode(token) ;
    this.username = decodedToken['sub'];
    this.getProfile();
  }

  getProfile(){
    this.userService.getUserByUsername(this.username).subscribe({
      next: (response: UserResponse) => {
        this.user = response.data;
        console.log(this.user);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching user:', error);
      }
    });
  }

  editUser(){
    this.isModalOpen = true;
  }
}