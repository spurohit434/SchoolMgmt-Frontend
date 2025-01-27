import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,  // Standalone component if needed
  imports: [ReactiveFormsModule, RouterModule, NgFor],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'] // Corrected the typo here
})
export class SidebarComponent {

  menuItems = [
    { label: 'User Management',link: 'users' },
    { label: 'Leaves Management', link: 'leaves' },
    { label: 'Notifications Management', link: 'notifications' },
    { label: 'Fee Management', link: 'fee' },
    { label: 'Attendance Management', link: 'attendance' },
    { label: 'Course Management', link: 'courses' },
    { label: 'Marks Management', link: 'marks' },
  ];
}