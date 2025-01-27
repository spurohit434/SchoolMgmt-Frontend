import { Component } from '@angular/core';
import { FeeService } from '../../services/fee-service/fee.service';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ReactiveFormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { UserDetails, UserResponse } from '../../models/user.model';
import { UserService } from '../../services/user-service/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoggedResponse } from '../../models/auth.model';
import { FeeModel1 } from '../../models/fee.model';
import { CurrencyPipe, NgClass } from '@angular/common';
import { DatePipe } from '@angular/common';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-student-fee',
  imports: [ToastModule, ButtonModule, ReactiveFormsModule, CurrencyPipe, DatePipe, NgClass, Toast],
  templateUrl: './student-fee.component.html',
  styleUrl: './student-fee.component.scss',
  providers: [FeeService, MessageService]
})
export class StudentFeeComponent {

viewTransaction() {
throw new Error('Method not implemented.');
}
  constructor(private feeService: FeeService, private messageService: MessageService, private userService: UserService) {
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

    StudentFee: FeeModel1 = {
      studentId: '',
      name: '',
      username: '',
      feeAmount: 0,
      deadline: '',
      fine: 0
    }

    isModalOpen: boolean = false;

    openFeeModal(){
      this.isModalOpen = true;
    }

    closeFeeModal(){
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
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error fetching user:', error);
        }
      });
    }

  

  checkFee() {
   this.feeService.checkFee(this.user.userId).subscribe({
      next: (response: LoggedResponse) => {
        const response1 = response.data as FeeModel1;
        this.StudentFee = response1;
        console.log(this.StudentFee);
        this.openFeeModal();
      },
      error: (error) => {
        console.error('Error:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No fees Due' });
      },
   });
   
  }
  payFee() {
    this.feeService.payFee(this.user.userId).subscribe({
      next: (response: LoggedResponse) => {
        console.log(response);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Fee paid successfully' });
        console.log("hello")
      },
      error: (error: LoggedResponse) => {
        console.error('Error:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Fee payment failed' });
      },
    });
  }
}