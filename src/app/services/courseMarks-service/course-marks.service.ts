import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../shared/constants/constants';
import { LoggedResponse } from '../../models/auth.model';
import { Observable } from 'rxjs';
import { CourseMarks } from '../../models/course.model';
import { Marksheet } from '../../models/marksheet.model';

@Injectable({
  providedIn: 'root'
})
export class CourseMarksService {

  constructor(private httpClient: HttpClient) { }

  addMarks(courseMarks: CourseMarks): Observable<LoggedResponse>{
    return this.httpClient.post<LoggedResponse>(`${BASE_URL}/user/${courseMarks.userId}/marks`, courseMarks);
  }

  getMarks(userId: string): Observable<LoggedResponse>{
    return this.httpClient.get<LoggedResponse>(`${BASE_URL}/user/${userId}/marks`);
  }

  getMarksheet(userId:string): Observable<Marksheet> {
    return this.httpClient.get<Marksheet>(`${BASE_URL}/user/${userId}/marksheet`);
  }
}
