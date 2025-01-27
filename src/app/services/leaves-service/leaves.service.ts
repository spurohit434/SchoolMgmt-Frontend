import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../../shared/constants/constants';
import { LeaveAppRej, LeaveModel, LeaveResponse } from '../../models/leave.model';
import { LoggedResponse } from '../../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class LeavesService {

  constructor(private httpClient: HttpClient) { }

  getAllLeaves(){
      return this.httpClient.get<LeaveResponse>(`${BASE_URL}/leave`);
  }

  approveLeave(leaveId:string){
    return this.httpClient.put<LeaveAppRej>(`${BASE_URL}/user/${leaveId}/leave/approve`,{
    });
  }

  rejectLeave(leaveId:string){
    return this.httpClient.put<LeaveAppRej>(`${BASE_URL}/user/${leaveId}/leave/reject`,{});
  }

  applyLeave(userId:string, model: LeaveModel){
    return this.httpClient.post<LoggedResponse>(`${BASE_URL}/user/${userId}/leave`, model);
  }

  checkLeaveStatus(userId: string){
    return this.httpClient.get<LoggedResponse>(`${BASE_URL}/user/${userId}/leave`);
  }
}
