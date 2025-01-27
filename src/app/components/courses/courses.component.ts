import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { CourseService } from '../../services/courses-service/course.service';
import { LoggedResponse } from '../../models/auth.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Courses } from '../../models/course.model';
import { NgFor, NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-courses',
  imports: [ToastModule, ButtonModule, NgIf, NgFor, ReactiveFormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
  providers: [MessageService]
})
export class CoursesComponent {

  constructor(private messageService: MessageService, private courseService: CourseService) { }

  form = new FormGroup({
    courseName: new FormControl('', Validators.required),
    standard: new FormControl(0, Validators.required)
  })

  courses: Courses[] = [];
  isModalOpen : boolean = false;
  
  addCourse() {
    this.isModalOpen = true;
  }
  closeAddUserModal() {
    this.isModalOpen = false;
  }

  getAllCourses() {
    this.courseService.getAllCourses().subscribe({
      next: (response: LoggedResponse) => {
        console.log(response);
        this.courses = response.data;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Courses fetched successfully' });
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching courses:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error fetching courses' });
      }
    });
  }

  deleteCourse(courseId: string) {
    this.courseService.deleteCourse(courseId).subscribe({
      next: (response: LoggedResponse) => {
        console.log(response);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Course deleted successfully' });
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error deleting course:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting course' });
      }
    });
    setTimeout(() => {
      this.getAllCourses(), 1000
    });
  }

  onSubmit() {
    if(this.form.valid) {
      const courseName = this.form.value.courseName as string;
      const standard = this.form.value.standard as number; 
      this.courseService.addCourse(courseName, standard).subscribe({
        next: (response: LoggedResponse) => {
          console.log(response);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Course added successfully' });
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error adding course:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error adding course' });
        }
      });
      setTimeout(() => {
        this.getAllCourses(), 1000
      });
    }
  }

}