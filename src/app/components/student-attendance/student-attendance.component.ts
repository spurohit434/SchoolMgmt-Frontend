import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { Button } from 'primeng/button';
import { ButtonModule } from 'primeng/button';
import { HttpErrorResponse } from '@angular/common/http';
import { UserDetails, UserResponse } from '../../models/user.model';
import { UserService } from '../../services/user-service/user.service';
import { jwtDecode } from 'jwt-decode';
import { MessageService } from 'primeng/api';
import { AttendanceService } from '../../services/attendance-service/attendance.service';
import { LoggedResponse } from '../../models/auth.model';
import { AttendanceModel } from '../../models/attendance.model';
import { NgFor, NgIf } from '@angular/common';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-student-attendance',
  imports: [ToastModule, Button, ButtonModule, NgIf, NgFor, DatePipe],
  templateUrl: './student-attendance.component.html',
  styleUrl: './student-attendance.component.scss',
  providers: [MessageService]
})
export class StudentAttendanceComponent {

  constructor(private userService: UserService, private attendanceService: AttendanceService, private messageService: MessageService) {
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
    attendanceDetails: AttendanceModel[] = [];

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

  viewAttendance() {
    this.attendanceService.getAttendanceById(this.user.userId).subscribe({
      next: (response: LoggedResponse) => {
        this.attendanceDetails = response.data;
        console.log(this.attendanceDetails);
        this.messageService.add({severity:'success', summary: 'Attendance fetched successfully', detail: 'Attendance fetched successfully'});
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching attendance:', error);
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Error fetching attendance'});
      }
    })
  }

 
  
    

  

}
