import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        UserService
      ],
    });

    userService = TestBed.get(UserService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it(`should fetch users as an Observable`, async(inject([HttpTestingController, UserService],
    (httpClient: HttpTestingController, userService: UserService) => {

      const postItem = [
        {
          "_id": 1,
          "name": "name1",
          "username": "testusername",
          "password": "123"
        },
        {
          "_id": 2,
          "name": "name2",
          "username": "username1",
          "password": "1655"
        },
      ];


      userService.all()
        .subscribe((users: any) => {
          expect(users.length).toBe(2);
        });

      let req = httpMock.expectOne('http://localhost:8080/api/user/');
      expect(req.request.method).toBe("GET");

      req.flush(postItem);
      httpMock.verify();

    })));
});