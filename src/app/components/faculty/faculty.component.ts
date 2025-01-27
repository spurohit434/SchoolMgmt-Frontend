import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';
import { SidebarFacultyComponent } from '../sidebar-faculty/sidebar-faculty.component';

@Component({
  selector: 'app-faculty',
  imports: [HeaderComponent, RouterOutlet, SidebarFacultyComponent],
  templateUrl: './faculty.component.html',
  styleUrl: './faculty.component.scss'
})
export class FacultyComponent {

}
