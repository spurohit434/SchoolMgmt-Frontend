import { Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginGuard } from './shared/guards/login.guard';
import { StudentComponent } from './components/student/student.component';
import { LeavesComponent } from './components/leaves/leaves.component';
import { NotificationComponent } from './components/notification/notification.component';
import { FeeComponent } from './components/fee/fee.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StudentFeeComponent } from './components/student-fee/student-fee.component';
import { StudentLeavesComponent } from './components/student-leaves/student-leaves.component';
import { StudentNotificationsComponent } from './components/student-notifications/student-notifications.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { StudentAttendanceComponent } from './components/student-attendance/student-attendance.component';
import { FacultyComponent } from './components/faculty/faculty.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseMarksComponent } from './components/course-marks/course-marks.component';
import { StudentCourseMarksComponent } from './components/student-course-marks/student-course-marks.component';

export const routes: Routes = [
   { 
      path: '', 
      component: LoginComponent
   },
   {  
      path: 'user',
      component: UsersComponent,
      canActivate: [LoginGuard] 
   },
   { 
      path: 'login', 
      component: LoginComponent
   },
   {  
      path: 'home', 
      component: HomeComponent,
      canActivate: [LoginGuard]
   },
   { 
      path: 'admin/home', 
      canActivate: [AuthGuard, LoginGuard],
     component: AdminComponent,
      children: [
         { 
            path: 'users', 
            component: UsersComponent 
         },
         {
            path: 'leaves', 
            component: LeavesComponent
         },
         {
            path: 'notifications', 
            component: NotificationComponent
         },
         {
            path: 'fee', 
            component: FeeComponent
         },
         {
            path: 'profile', 
            component: ProfileComponent
         },
         {
            path: 'attendance', 
            component: AttendanceComponent
         },
         {
            path: 'courses', 
            component: CoursesComponent
         },
         {
            path: 'marks', 
            component: CourseMarksComponent
         }
      ]
   },
   { 
      path: 'student/home', 
      canActivate: [AuthGuard, LoginGuard],
     component: StudentComponent,
      children: [
         {
            path: 'profile', 
            component: ProfileComponent
         },
         {
            path: 'fee', 
            component: StudentFeeComponent
         },
         {
            path: 'leaves', 
            component: StudentLeavesComponent 
         },
         {
            path: 'notifications',  
            component: StudentNotificationsComponent
         },
         {
            path: 'attendance',  
            component: StudentAttendanceComponent
         },
         {
            path: 'marks',  
            component: StudentCourseMarksComponent
         }
      ]
   },
   { 
      path: 'faculty/home', 
     canActivate: [AuthGuard, LoginGuard],
     component: FacultyComponent,
      children: [
         {
            path: 'profile', 
            component: ProfileComponent
         },
         {
            path: 'leaves', 
            component: StudentLeavesComponent 
         },
         {
            path: 'notifications',  
            component: StudentNotificationsComponent
         },
         {
            path: 'attendance',  
            component: AttendanceComponent
         },
         {
            path: 'marks',  
            component: CourseMarksComponent
         }
      ]
   }
];

