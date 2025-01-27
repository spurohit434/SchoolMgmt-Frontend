import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { UserService } from '../../services/user-service/user.service';
import { LoggedResponse } from '../../models/auth.model';
import { UserDetails } from '../../models/user.model';
import { AttendanceService } from '../../services/attendance-service/attendance.service';
import { HttpErrorResponse } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { AttendanceModel } from '../../models/attendance.model';

@Component({
  selector: 'app-attendance',
  imports: [ToastModule, ButtonModule, DialogModule, ReactiveFormsModule, NgIf, NgFor, DatePipe],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class AttendanceComponent implements OnInit { 

  constructor(private userService: UserService, private messageService: MessageService, private confirmationService: ConfirmationService, 
    private attendanceService: AttendanceService
  ) { }

  ngOnInit(){
    this.getAllUsers();
  }

  isModalOpen: boolean = false;
  users: UserDetails[] = [];
  standardUsers: AttendanceModel[] = [];
  selectedUserId: string = '';
  selectedStandard: number = 0;
  isAttendanceModalOpen: boolean = false

  openModal(userId: string, standard: number) {
    this.isModalOpen = true;
    this.selectedUserId = userId;
    this.selectedStandard = standard;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  openAttendanceModal(){
    this.isAttendanceModalOpen = true;
  }

  closeAttendanceModal(){
    this.isAttendanceModalOpen = false;
  }

  form = new FormGroup({
    date: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
  });

  form1 = new FormGroup({
    standard: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(12)]),
  });

  getAllUsers() {
    this.userService.getAllUsers().subscribe({
        next: (response: LoggedResponse) => {
          this.users = response.data.content; // Ensure you are assigning an array to this.users
          this.users = this.users.filter( user => user.role == 'Student');
          this.standardUsers = [];
        },
        error: (error) => {
          console.error('Error fetching users:', error);
      }
    });
  }

  onSubmit() {
    if(this.form.valid) {
      const date = this.form.value.date as string;
      const status = this.form.value.status as string;
      const studentId = this.selectedUserId;
      const standard = this.selectedStandard;
      const attendanceModel = {studentId, standard, date, status};
    this.attendanceService.addAttendance(studentId, attendanceModel).subscribe({
      next: (response: LoggedResponse) => {
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Attendance added successfully'});
        console.log(response);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error adding attendance:', error);
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Error adding attendance'});
      } 
    });
    }
    this.closeModal();
  }

  onSubmit1(){
    if(this.form1.valid){
      const standard = this.form1.value.standard as number;
      this.attendanceService.getAttandanceByStandard(standard).subscribe({
        next: (response: LoggedResponse) => {
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Attendance fetched successfully'});
          this.standardUsers = response.data;
          this.users = [];
        },
        error: (error: HttpErrorResponse) => {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Error fetching attendance'});
        }
      });
    }
    this.closeAttendanceModal();
  }
}
