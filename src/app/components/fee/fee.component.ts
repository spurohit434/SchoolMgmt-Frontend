import { Component, OnInit } from '@angular/core';
import { FeeService } from '../../services/fee-service/fee.service';
import { UserService } from '../../services/user-service/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FeeModel, FeeModel1, FeeResponse } from '../../models/fee.model';
import { UserDetails } from '../../models/user.model';
import { LoginResponse } from '../../models/auth.model';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { NgFor, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-fee',
  imports: [ToastModule, ButtonModule, ReactiveFormsModule, NgIf, NgFor, CurrencyPipe, DatePipe],
  templateUrl: './fee.component.html',
  styleUrl: './fee.component.scss',
  providers: [MessageService]
})
export class FeeComponent implements OnInit { 

  constructor(private feeService: FeeService, private userService: UserService, private messageService: MessageService){
  }
  ngOnInit(): void {
    this.getAllUsers();
  }

  users: UserDetails[] = []; 
  DuesUsers: FeeModel1[] = [];
  isModalOpen = false;  // Modal visibility state
  selectedUserId: string = '';
  selectedUserName: string = '';
  selectedName: string = '';

  form = new FormGroup({
    feeAmount: new FormControl(0, Validators.required),
    deadline: new FormControl('', Validators.required),
    fine: new FormControl(0)
  });

  openAddUserModal() {
    this.isModalOpen = true;
  }

  closeAddUserModal() {
    this.isModalOpen = false;
  }

  getAllUsers() {
      this.userService.getAllUsers().subscribe({
        next: (response: LoginResponse) => {
          this.users = response.data.content; // Ensure you are assigning an array to this.users
          this.users = this.users.filter( user => user.role == 'Student');
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error fetching users:', error);
        }
      });
    this.DuesUsers = [];
  }

  addFee(userId: string, userName: string, name: string){
    this.selectedUserId = userId;
    this.selectedUserName = userName;
    this.selectedName = name;
    this.isModalOpen = true;
    console.log("flow reached");
  }

  onSubmit(): void{
    if(this.form.valid){
      const userID = this.selectedUserId
      const name = this.selectedName;
      const username = this.selectedUserName;
      const feeAmount = this.form.value.feeAmount!;
      const deadline = this.form.value.deadline!;
      const fine = this.form.value.fine!;
      const feeModel: FeeModel = {name, username, feeAmount, deadline, fine};
      this.feeService.addFee(userID,feeModel).subscribe(
        (data) => {
          console.log(data);
        }
      );
    }
    this.form.reset();
    this.isModalOpen = false;
  }

  updateFee(userId: string, userName: string, name: string){
    this.selectedUserId = userId;
    this.selectedUserName = userName;
    this.selectedName = name;
    this.isModalOpen = true;
    console.log("flow reached");
  }

  getAllDues(){
    this.feeService.getAllDues().subscribe({
       next: (data: FeeResponse) => {
        console.log(data);
        this.DuesUsers = data.data;
        this.DuesUsers = this.DuesUsers.filter( user => user.feeAmount > 0);
        console.log(this.DuesUsers);
       },
       error: (error: HttpErrorResponse) => {
        console.error('Error fetching dues:', error);
       }
    });
    this.users = [];
  }


}
