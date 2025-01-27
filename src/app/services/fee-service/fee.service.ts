import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../shared/constants/constants';
import { FeeModel, FeeResponse } from '../../models/fee.model';
import { Observable } from 'rxjs';
import { LoggedResponse } from '../../models/auth.model';


@Injectable({
  providedIn: 'root'
})
export class FeeService {

  constructor(private httpClient: HttpClient) {
  }

  payFeeResponse: LoggedResponse["status"] | undefined;

  addFee(userId: string, feeModel: FeeModel): Observable<Response>{
    return this.httpClient.post<Response>(`${BASE_URL}/user/${userId}/fee`, 
      feeModel
    );
  }

  getAllDues(): Observable<FeeResponse>{
    return this.httpClient.get<FeeResponse>(`${BASE_URL}/user/fee`
    );
  }

  payFee(userId: string): Observable<LoggedResponse>{
    return this.httpClient.put<LoggedResponse>(`${BASE_URL}/user/${userId}/fee`, {});
  }

  checkFee(userId: string): Observable<LoggedResponse>{
    return this.httpClient.get<LoggedResponse>(`${BASE_URL}/user/${userId}/fee`);
  }
}
