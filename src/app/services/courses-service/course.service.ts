import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../shared/constants/constants';
import { LoggedResponse } from '../../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private httpClient:HttpClient){ }

  getAllCourses(): Observable<LoggedResponse> {
    return this.httpClient.get<LoggedResponse>(`${BASE_URL}/course`);
  }

  deleteCourse(courseId: string): Observable<LoggedResponse> {
    return this.httpClient.delete<LoggedResponse>(`${BASE_URL}/course/${courseId}`);
  }

  addCourse(courseName: string, standard:number): Observable<LoggedResponse>{
    return this.httpClient.post<LoggedResponse>(`${BASE_URL}/course`, {courseName, standard});
  }

  getCourseByStandard(standard: number): Observable<LoggedResponse>{
    return this.httpClient.get<LoggedResponse>(`${BASE_URL}/course/standard/${standard}`);
  }

}
