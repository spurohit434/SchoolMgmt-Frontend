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
import { CourseMarks, Courses, UpdatedCourseMarks } from '../../models/course.model';
import { NgFor, NgIf } from '@angular/common';
import { Marksheet } from '../../models/marksheet.model';
import { CourseService } from '../../services/courses-service/course.service';

@Component({
  selector: 'app-student-course-marks',
  imports: [ToastModule, ButtonModule, NgIf, NgFor],
  templateUrl: './student-course-marks.component.html',
  styleUrl: './student-course-marks.component.scss',
  providers: [MessageService]
})
export class StudentCourseMarksComponent implements OnInit {

  constructor(private messageService: MessageService, private userService: UserService, private courseMaksService: CourseMarksService,
    private courseService: CourseService){
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
  marksheet: Marksheet | undefined;
  courses: Courses[] = [];
  updatedCourseMarks: UpdatedCourseMarks[] = [];
  
    ngOnInit(){
      const token = localStorage.getItem('authToken') as string;
      const decodedToken:any = jwtDecode(token) ;
      this.username = decodedToken['sub'];
      this.getProfile();
      this.getAllCourses();
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
    this.updatedCourseMarks = [];
    this.marksheet = undefined;
    this.courseMaksService.getMarks(this.user.userId).subscribe({
      next: (response: LoggedResponse) => {
        this.courseMarks = response.data;
        for(let i = 0; i < this.courseMarks.length; i++) {
           for(let j = 0; j< this.courses.length; j++){
              if( this.courseMarks[i].courseId === this.courses[j].courseId){
                const courseId = this.courseMarks[i].courseId;
                const courseName = this.courses[j].courseName;
                const userId = this.courseMarks[i].userId;
                const marks = this.courseMarks[i].marks;
                const standard = this.courseMarks[i].standard;
                this.updatedCourseMarks.push({courseId, courseName, userId, marks, standard});
              }
           }
        }
        console.log(this.courseMarks);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching marks:', error);
      }
    });
  }

  getMarksheet(){
    this.updatedCourseMarks = [];
    this.courseMaksService.getMarksheet(this.user.userId).subscribe({
      next: (response: Marksheet) => {
        this.marksheet = response;
        for(let i = 0; i < this.marksheet.courseMarks.length; i++) {
          for(let j = 0; j< this.courses.length; j++){
             if( this.marksheet.courseMarks[i].courseId === this.courses[j].courseId){
               this.marksheet.courseMarks[i].courseName = this.courses[j].courseName;
             }
          }
       }
       console.log(this.marksheet);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    })
  }

  getAllCourses(){
    this.courseService.getAllCourses().subscribe({
      next: (response: LoggedResponse) => {
        this.courses = response.data;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching courses:', error);
      }
    })
  }
}