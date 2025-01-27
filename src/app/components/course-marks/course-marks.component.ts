import { Component } from '@angular/core';
import { UserDetails } from '../../models/user.model';
import { UserService } from '../../services/user-service/user.service';
import { NotificationService } from '../../services/notification-service/notification.service';
import { MessageService } from 'primeng/api';
import { LoggedResponse, LoginResponse } from '../../models/auth.model';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { NgFor, NgIf } from '@angular/common';
import { CourseMarks, CourseResponse, Courses } from '../../models/course.model';
import { CourseService } from '../../services/courses-service/course.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourseMarksService } from '../../services/courseMarks-service/course-marks.service';

@Component({
  selector: 'app-course-marks',
  imports: [ToastModule, ButtonModule, NgIf, NgFor, ReactiveFormsModule],
  templateUrl: './course-marks.component.html',
  styleUrl: './course-marks.component.scss',
  providers: [ MessageService]
})
export class CourseMarksComponent {
    users: UserDetails[] = []; 
    loading: boolean = false;
    isModalOpen = false;  // Modal visibility state
    selectedUserId: string = '';
    selectedStandard: number = 0;
    courses: Courses[] = [];
    
    constructor(private userService: UserService, private notificationService: NotificationService, private messageService: MessageService
       , private courseService: CourseService, private courseMarksService: CourseMarksService
    ){}

    form = new FormGroup({
      courseId: new FormControl('', Validators.required),
      marks: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)])
    })
    
    ngOnInit(){
      this.getAllUsers();
    }

    openAddMarksModal(){
      this.isModalOpen = true;
    }

    closeAddMarksModal(){
      this.isModalOpen = false;
    }

    getAllUsers() {
      this.loading = true;
      this.userService.getAllUsers().subscribe(
        (response: LoginResponse) => {
          this.users = response.data.content; // Ensure you are assigning an array to this.users
          this.users = this.users.filter( user => user.role == 'Student' );
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching users:', error);
          this.loading = false;
          }
        );
    }

    addMarks(userId: string, standard: number){
      this.selectedUserId = userId;
      this.selectedStandard = standard;
      this.courseService.getCourseByStandard(standard).subscribe({
        next: (response: LoggedResponse) => {
          console.log(response);
          this.courses = response.data;
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error fetching courses:', error);
        }
      })
      this.openAddMarksModal();
    }

    onSubmit(){
     console.log(this.form.value);
     if(this.form.value){
      const userId = this.selectedUserId;
      const standard = this.selectedStandard;
      const courseId = this.form.value.courseId as string;
      const marks = this.form.value.marks as number;
      const courseMarks: CourseMarks = {userId, courseId, standard, marks};
      console.log(courseMarks);
       this.courseMarksService.addMarks(courseMarks).subscribe({
        next: (response: LoggedResponse) => {
          console.log(response);
          this.messageService.add({severity:'success', summary: 'Marks Added'});
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error adding marks:', error);
          this.messageService.add({severity: 'error', summary: 'Error Adding Marks'});
        }
       })
       this.form.reset();
       this.closeAddMarksModal();
     }
    }
}
