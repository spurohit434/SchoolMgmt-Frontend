import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { UserService } from "./user.service";
import { UserDetails } from "../../models/user.model";
import { LoggedResponse, LoginResponse } from "../../models/auth.model";
import { TestBed } from "@angular/core/testing";

describe('UserService', () => {
    let userService: UserService;
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
    
    const response: LoginResponse = {
        message: 'Logged In Successfully',
        status: 'success',
        data: {
            content: [testUser, testUser],
            page: 0,
            size: 1,
            totalElements: 1,
            totalPages: 1
        }
    }

    const data1 : LoginResponse['data'] = {
        content: [testUser, testUser],
        page: 0,
        size: 1,
        totalElements: 1,
        totalPages: 1
    }

    beforeEach( () => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UserService]
        })
    httpTestingController = TestBed.inject(HttpTestingController);
    })

    fit('should test get all users',(done) => {
        const content = data1;
        const message = 'User Fetched Successfully';
        const status ='Success';

        userService = TestBed.inject(UserService);
        userService.getAllUsers().subscribe({
            next: (response: LoginResponse) => {
                expect(response.message).toEqual(message);
                expect(response.status).toEqual(status);
                expect(response.data).toEqual(content);
                done();
            }
        })

    })
    
})