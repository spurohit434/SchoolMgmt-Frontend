import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { formInput, UserDetails } from '../../models/user.model';
import { UserService } from '../../services/user-service/user.service';
import { LoginResponse } from '../../models/auth.model';
import { OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { Paginator, PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-users',
  imports: [ReactiveFormsModule, NgIf, NgFor, NgClass,DialogModule,ButtonModule, ToastModule, TableModule, ConfirmPopupModule, Paginator, PaginatorModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  standalone: true,
  providers: [MessageService, ConfirmationService]  // Adding MessageService to provide access to the toast service in the component.  This is necessary to display toast messages.  Without this, the toast messages would not be displayed.  This is a workaround for a known issue in Angular.  For more information, see https://github.com/primefaces/primeng/issues/8491.  The workaround is to create a service and inject it into the component, or to use the
})
export class UsersComponent implements OnInit {
  users: UserDetails[] = []; 
  displayModal: any;
  loading: boolean = false;
  isModalOpen = false;  // Modal visibility state
  page: number = 1;
  size: number = 6;
  totalElements: number = 10;
  totalPages: number = 5;
  userId: string = '';
  openDialog: boolean = false;

  constructor(private userService: UserService, private messageService: MessageService,private confirmationService: ConfirmationService) {
  }
  ngOnInit(): void {
    this.getAllUsers();
  }

  onPageChange(event: PaginatorState): void {
    console.log(event);
    this.page = event.page! + 1;
    this.getAllUsers();
  }

  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Showing All users Successfully' });
  }


  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
    dob: new FormControl('2004-04-03'),
    contactNumber: new FormControl('', [Validators.pattern('^[0-9]{10}$')]), // Optional: Validate a 10-digit phone number
    role: new FormControl('', Validators.required),
    username: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl(0 , [Validators.required, Validators.min(0), Validators.max(120)]),
    gender: new FormControl('M', Validators.required), // Default to 'male'
    rollNo: new FormControl(''),
    mentorOf: new FormControl(0), // Only numbers allowed
    address: new FormControl('', Validators.required), // Adding address field
    standard: new FormControl(0) // Adding standard field with validation
  });
  

    // This function opens the modal
    openAddUserModal() {
      this.isModalOpen = true;
    }
  
    // This function closes the modal
    closeAddUserModal() {
      this.isModalOpen = false;
    }

  getAllUsers() {
    this.loading = true;
    console.log(this.page, this.size);

    this.userService.getAllUsers1(this.page, this.size).subscribe({
      next: (response: LoginResponse) => {
        this.users = response.data.content; // Ensure you are assigning an array to this.users
        this.loading = false;
      },
      error: (error: LoginResponse) => {
        console.error('Error fetching users:', error);
        this.loading = false;
      }
    });
  }
  
  onUpdateUser(userId: string){
  }

  confirmDelete(userId: string) {
    this.userId = userId;
    this.openDialog = true;
  }

  closeDialogModule(){
    this.openDialog = false;
  }


  onDeleteUser() {
    this.userService.deleteUser(this.userId).subscribe({
      next: (data: any) =>{
          this.users = this.users.filter(user => user.userId !== this.userId);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User Deleted Successfully' });
          this.closeDialogModule();
        },
      error: (error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User Can Not be Deleted' });
        console.error('Error deleting user:', error);
      }
    });
    this.getAllUsers();
    this.closeDialogModule();
  }

  onSubmit(){
    if (this.form.valid) {
      console.log(this.form);
      this.loading = true;
      const formData = this.form.value;
      const userDetails: formInput = {
        name: formData.name ?? '',  // Fallback to empty string if null or undefined
        age: formData.age ?? 0,  // Fallback to 0 if null or undefined
        role: formData.role ?? '',  // Fallback to empty string if null or undefined
        gender: formData.gender ?? 'male',  // Fallback to 'male' if null or undefined
        username: formData.username ?? '',
        password: formData.password ?? '',
        address: formData.address ?? '',  // Fallback to empty string if null or undefined
        dob: formData.dob ?? '',
        email: formData.email ?? '',
        rollNo: formData.rollNo ?? '',
        standard: formData.standard ?? 0,  // Fallback to 0 if null or undefined
        contactNumber: formData.contactNumber ?? '',
        mentorOf: formData.mentorOf ?? 0  // Fallback to 0 if null or undefined
      };
      console.log(userDetails);
      this.userService.addUser(userDetails).subscribe( 
        (data) => {
          this.messageService.add({ severity: 'Success', summary: 'Success', detail: 'User Added Successfully' });
        },
        (error) => {
          this.messageService.add({ severity: 'Failure', summary: 'Failure', detail: 'User Can Not be Added' });
        }
    );
      this.closeAddUserModal();  // Close the modal after submission
    } else {
      this.messageService.add({ severity: 'Failure', summary: 'Failure', detail: 'Form Invalid' });
      console.log('Form is invalid');
    }
  }
}