import { Injectable } from '@angular/core';
import { AttendanceModel } from '../../models/attendance.model';
import { LoggedResponse } from '../../models/auth.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../shared/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private httpClient: HttpClient) { }

  addAttendance(userId: string, attendanceInput: AttendanceModel): Observable<LoggedResponse>{
    return this.httpClient.post<LoggedResponse>(`${BASE_URL}/user/${userId}/attendance`, attendanceInput );
  }

  getAttandanceByStandard(standard: number): Observable<LoggedResponse>{
    return this.httpClient.get<LoggedResponse>(`${BASE_URL}/attendance/${standard}`);
  }

  getAttendanceById(studentId: string): Observable<LoggedResponse>{
    return this.httpClient.get<LoggedResponse>(`${BASE_URL}/user/${studentId}/attendance`);
  }

  
}
