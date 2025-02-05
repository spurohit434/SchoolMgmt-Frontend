import { Component, OnInit } from '@angular/core';
import { LeavesService } from '../../services/leaves-service/leaves.service';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { LeaveAppRej, LeaveDetails, LeaveResponse } from '../../models/leave.model';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-leaves',
  imports: [NgFor, NgIf, ToastModule, ButtonModule, DatePipe, FormsModule],
  templateUrl: './leaves.component.html',
  styleUrl: './leaves.component.scss',
  providers: [MessageService]
})
export class LeavesComponent implements OnInit  {
  leaves: LeaveDetails[] = [];
  fileteredLeaves: LeaveDetails[] = [];
  searchLeaveText: string = '';

  constructor(private leavesService: LeavesService, private messageService: MessageService){}

  ngOnInit(): void {
    this.viewAllLeaves();
  }
  viewAllLeaves(){
    this.leavesService.getAllLeaves().subscribe( (response: LeaveResponse) => {
      console.log(response) 
      this.leaves = response.data;
      this.fileteredLeaves = [...this.leaves];
    },
    (error) => {
      console.error('Error fetching users:', error);
    }
    );
  }

  filterLeaves() {
    this.fileteredLeaves = this.leaves.filter((leave) =>
      leave.name.toLowerCase().includes(this.searchLeaveText.toLowerCase())
    );
  }

  approveLeave(leaveId:string, status:string){ 
   if(status === 'Rejected' || status === 'Approved'){
    this.messageService.add({ severity: 'failure', summary: 'Failure', detail: 'Leave can not be approved' });
   }
   else{
      this.leavesService.approveLeave(leaveId).subscribe((response: LeaveAppRej) => {
        console.log(response);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Leave approved Successfully' });
      },
      (error) => {
        this.messageService.add({ severity: 'failure', summary: 'Failure', detail: 'Leave can not be approved' });
      }
    );
  }
  this.viewAllLeaves();
  }

  rejectLeave(leaveId:string, status:string){
    if(status === 'Rejected' || status === 'Approved'){
      this.messageService.add({ severity: 'failure', summary: 'Failure', detail: 'Leave can not be rejected' });
     }
     else{
        this.leavesService.rejectLeave(leaveId).subscribe((response: LeaveAppRej) => {
          console.log(response);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Leave rejected Successfully' });
          },
        (error) => {
          this.messageService.add({ severity: 'failure', summary: 'Failure', detail: 'Leave can not be rejected' });
        }
      );
    }
  this.viewAllLeaves();
  }
}
