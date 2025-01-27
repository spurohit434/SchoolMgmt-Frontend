import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-sidebar-student',
  imports: [ReactiveFormsModule, RouterModule, NgFor],
  templateUrl: './sidebar-student.component.html',
  styleUrl: './sidebar-student.component.scss'
})
export class SidebarStudentComponent {
  menuItems = [
    { label: 'Leaves Management', link: 'leaves' },
    { label: 'Fee Management', link: 'fee' },
    { label: 'Notifications Management', link: 'notifications' },
    { label: 'Attendance Management', link: 'attendance' },
    { label: 'Marks Management', link: 'marks' },
  ];
}
