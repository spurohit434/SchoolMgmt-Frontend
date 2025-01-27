import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { Button, ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { NotificationService } from '../../services/notification-service/notification.service';
import { jwtDecode } from 'jwt-decode';
import { UserDetails, UserResponse } from '../../models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../services/user-service/user.service';
import { LoggedResponse } from '../../models/auth.model';
import { ReadNotificationModel } from '../../models/notification.model';
import { NgFor, NgIf, DatePipe } from '@angular/common';

@Component({
  selector: 'app-student-notifications',
  imports: [ToastModule, ButtonModule, Button, NgIf, NgFor, DatePipe],
  templateUrl: './student-notifications.component.html',
  styleUrl: './student-notifications.component.scss',
  providers: [MessageService]
})
export class StudentNotificationsComponent {

  constructor(private messageService: MessageService, private notificationService: NotificationService, private userService: UserService) {}

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

  notificationModel: ReadNotificationModel[] = [];
  
      ngOnInit(){
          const token = localStorage.getItem('authToken') as string;
          const decodedToken:any = jwtDecode(token) ;
          this.username = decodedToken['sub'];
          this.getProfile();
      }
    
      getProfile(){
          this.userService.getUserByUsername(this.username).subscribe({
            next: (response: UserResponse) => {
              this.user = response.data;
            },
            error: (error: HttpErrorResponse) => {
              console.error('Error fetching user:', error);
            }
          });
        }
  

  readNotifications() {
    this.notificationService.readNotifications(this.user.userId).subscribe({
      next: (response: LoggedResponse) => {
        console.log(response);
        this.notificationModel = response.data;
        console.log(this.notificationModel);
        this.messageService.add({ severity:'success', summary: 'Success', detail: 'Notifications read successfully.' });
      },
      error: (error: LoggedResponse) => {
        this.messageService.add({ severity:'error', summary: 'Error', detail: 'No notifications found.' });
      }
    });
  }
}
