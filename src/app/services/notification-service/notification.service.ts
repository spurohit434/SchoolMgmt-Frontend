import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../shared/constants/constants';
import { NotificationModel } from '../../models/notification.model';
import { LoggedResponse } from '../../models/auth.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private httpClient: HttpClient) { }

  sendNotification(UserId: string, notification: NotificationModel): Observable<LoggedResponse>{
    return this.httpClient.post<LoggedResponse>(`${BASE_URL}/user/${UserId}/notification`,
      notification
    );
  }

  readNotifications(UserId: string): Observable<LoggedResponse> {
    return this.httpClient.get<LoggedResponse>(`${BASE_URL}/user/${UserId}/notification`
    );
  }
}
