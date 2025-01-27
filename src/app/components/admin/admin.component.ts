import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user-service/user.service';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-admin',
  imports: [ReactiveFormsModule, HeaderComponent, SidebarComponent, RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  standalone: true,
})
export class AdminComponent {
  constructor(private userService: UserService) { } 

  hasContent = false;

  onActivate() {
    console.log('Router-outlet content is active');
    this.hasContent = true; // Router-outlet has active content
  }

  onDeactivate() {
    console.log('Router-outlet content is inactive');
    this.hasContent = false; // Router-outlet content is removed
  }
}