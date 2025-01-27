import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { UserDetails, UserResponse } from '../../models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../services/user-service/user.service';
import { LeaveModel } from '../../models/leave.model';
import { LeavesService } from '../../services/leaves-service/leaves.service';
import { LoggedResponse } from '../../models/auth.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-student-leaves',
  imports: [ToastModule, ButtonModule, ReactiveFormsModule, NgIf, NgFor, DatePipe],
  templateUrl: './student-leaves.component.html',
  styleUrl: './student-leaves.component.scss',
  providers: [MessageService]
})
export class StudentLeavesComponent {

  constructor(private messageService: MessageService, private userService: UserService, private leavesService: LeavesService) { }

  isModalOpen: boolean = false;

  form = new FormGroup({
    content: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
  });

  leaveModels: LeaveModel[] = [];

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


  openLeaveModal(){
    this.isModalOpen = true;
  }

  closeLeaveModal(){
    this.isModalOpen = false;
  }

  leaveStatus() {
   this.leavesService.checkLeaveStatus(this.user.userId).subscribe({
     next: (response: LoggedResponse) => {
       console.log(response);
       this.leaveModels = response.data;
       this.messageService.add({severity:'success', summary: 'Success', detail: response.message});
     },
     error: (err: HttpErrorResponse) => {
       console.error('Error:', err);
       this.messageService.add({severity:'error', summary: 'Error', detail: 'Unable to check leave status'});
     }
   }); 
  }

  applyLeave() {
    this.openLeaveModal();
  }

  onSubmit() {
    if(this.form.valid) {
      const content = this.form.value.content!;
      const startDate = this.form.value.startDate!;
      const endDate = this.form.value.endDate!;
      const status = 'Pending';
      const userID = this.user.userId;
      const username = this.user.username;
      const name = this.user.name;
      const leaveModel: LeaveModel = { name, username, content, startDate, endDate, status};
      this.leavesService.applyLeave(userID, leaveModel).subscribe({
        next: (response: LoggedResponse) => {
          console.log(response);
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Leave applied successfully'});
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error:', err);
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Leave could not be applied'});
        }
      });
      
    }
  }

}
