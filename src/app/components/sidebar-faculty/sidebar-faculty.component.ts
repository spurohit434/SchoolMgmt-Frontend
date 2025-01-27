import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-sidebar-faculty',
  imports: [ReactiveFormsModule, RouterModule, NgFor],
  templateUrl: './sidebar-faculty.component.html',
  styleUrl: './sidebar-faculty.component.scss',
})
export class SidebarFacultyComponent {
  menuItems = [
    { label: 'Attendance Management', link: 'attendance' },
    { label: 'Course Management', link: 'courses' },
    { label: 'Marks Management', link: 'marks' },
    { label: 'Leaves Management', link: 'leaves' },
    { label: 'Notifications Management', link: 'notifications' },
  ];
}
