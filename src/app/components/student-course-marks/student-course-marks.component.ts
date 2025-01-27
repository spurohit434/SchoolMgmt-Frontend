import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { UserService } from '../../services/user-service/user.service';
import { OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { UserDetails, UserResponse } from '../../models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { CourseMarksService } from '../../services/courseMarks-service/course-marks.service';
import { LoggedResponse } from '../../models/auth.model';
import { CourseMarks } from '../../models/course.model';

@Component({
  selector: 'app-student-course-marks',
  imports: [ToastModule, ButtonModule],
  templateUrl: './student-course-marks.component.html',
  styleUrl: './student-course-marks.component.scss',
  providers: [MessageService]
})
export class StudentCourseMarksComponent implements OnInit {

  constructor(private messageService: MessageService, private userService: UserService, private courseMaksService: CourseMarksService){
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
  courseMarks: CourseMarks[] = [];
  
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

  getMarks(){
    this.courseMaksService.getMarks(this.user.userId).subscribe({
      next: (response: LoggedResponse) => {
        console.log(response);
        this.courseMarks = response.data;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching marks:', error);
      }
    });
  }

}
