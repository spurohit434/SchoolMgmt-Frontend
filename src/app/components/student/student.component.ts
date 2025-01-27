import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';
import { SidebarStudentComponent } from '../sidebar-student/sidebar-student.component';

@Component({
  selector: 'app-student',
  imports: [HeaderComponent, RouterOutlet, SidebarStudentComponent],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent {

}
