import { TestBed } from "@angular/core/testing";
import { LoggedResponse } from "../../models/auth.model";
import { UserDetails } from "../../models/user.model";
import { AuthService } from "./auth.service";
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { BASE_URL } from "../../shared/constants/constants";
import { Router } from '@angular/router';


fdescribe('AuthService', () => {
    let authService: AuthService;
    let httpTestingController: HttpTestingController;

    const testUser: UserDetails = {
        userId: '123456',
        name: 'Ravsa',
        age: 35,
        role: 'Student',
        gender: 'Male',
        username: 'Ravsa773',
        address: 'Jaipur',
        email: 'ravsa@gmail.com',
        mentorOf: 0,
        standard: 12
    }

    const response: LoggedResponse = {
        message: 'Logged In Successfully',
        status: 'success',
        data: testUser
    }

    beforeEach( () => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService]
        });
        httpTestingController = TestBed.inject(HttpTestingController);
    })

    fit('it should successfully login with given credentials', (done) => {
      const username: string = 'Shailesh123';
      const password: string = 'qwerty@123';
      const mockResponse : LoggedResponse = {
        message: 'Logged In Successfully',
        status:'success',
        data: testUser
      }

      authService = TestBed.inject(AuthService);
      authService.login(username, password).subscribe({
        next: (res: LoggedResponse) => {
            expect(res).toEqual(mockResponse);
            done();
        }
      });

      const mockreq = httpTestingController.expectOne(`${BASE_URL}/authenticate`);
      expect(mockreq.request.method).toBe('POST');
        expect(mockreq.request.body).toEqual({
        username: username,
        password: password,
        });
        mockreq.flush(mockResponse);
    })

})