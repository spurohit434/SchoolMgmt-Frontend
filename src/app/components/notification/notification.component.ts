import { NgClass, NgFor, NgIf, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service/user.service';
import { UserDetails } from '../../models/user.model';
import { LoggedResponse, LoginResponse } from '../../models/auth.model';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationService } from '../../services/notification-service/notification.service';
import { NotificationModel } from '../../models/notification.model';

@Component({
  selector: 'app-notification',
  imports: [NgFor, NgIf, ToastModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
  providers: [MessageService]
})

export class NotificationComponent implements OnInit {
  form = new FormGroup({
     type: new FormControl('', [Validators.required, Validators.minLength(4)]),
     description: new FormControl('', Validators.required), // Adding address field
});

  users: UserDetails[] = []; 
  loading: boolean = false;
  isModalOpen = false;  // Modal visibility state
  selectedUserId: string = '';

  
  constructor(private userService: UserService, private notificationService: NotificationService, private messageService: MessageService){
  }

  ngOnInit(){
    this.getAllUsers();
  }

  openAddUserModal() {
    this.isModalOpen = true;
  }

  closeAddUserModal() {
    this.isModalOpen = false;
  }
  
  getAllUsers() {
      this.loading = true;
      this.userService.getAllUsers().subscribe(
        (response: LoginResponse) => {
          this.users = response.data.content; // Ensure you are assigning an array to this.users
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching users:', error);
          this.loading = false;
        }
      );
  }

  sendNotifications(userId: string) {
    this.selectedUserId = userId;
    this.isModalOpen = true;
  }

    onSubmit(): void{
      if(this.form.valid){
        const description = this.form.value['description'] as string;
        const type = this.form.value['type'] as string;
        const notificationModel: NotificationModel = {description, type};
        this.notificationService.sendNotification(this.selectedUserId, notificationModel).subscribe({
          next: (response : LoggedResponse): void => {
          console.log(response);  
          this.messageService.add({ severity: 'Success', summary: 'Success', detail: 'Notification sent Successfully' });        
          },
          error: (error: LoggedResponse) => {
          this.messageService.add({ severity: 'failure', summary: 'Failure', detail: 'Notification can not be sent' }); 
          },
        },
        );
        this.form.reset();
        this.isModalOpen = false;  // Modal visibility state after form submission.  After successful notification, it should close the modal.
      }
    }
}
