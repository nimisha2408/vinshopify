import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrderService } from './order.service';

describe('OrderService', () => {
  let orderService: OrderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        OrderService
      ],
    });

    orderService = TestBed.get(OrderService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it(`should fetch orders as an Observable`, (inject([HttpTestingController, OrderService],
    (httpClient: HttpTestingController, orderService: OrderService) => {

      const orders = [
        {
          "_id": 1,
          "id_product": 2,
          "id_user": 1,
          "price": 12,
          "discount": 0,
          "total_price": 12,
          "quantity": 1,
          "createdAt": '',
          "user":[],
          "product":[],
        },
        {
          "_id": 1,
          "id_product": 2,
          "id_user": 1,
          "price": 12,
          "discount": 0,
          "total_price": 12,
          "quantity": 1,
          "createdAt": '',
          "user":[],
          "product":[]
        },
      ];


      orderService.all()
        .subscribe((orders: any) => {
          expect(orders.length).toBe(2);
        });

      let req = httpMock.expectOne('http://localhost:8080/api/order/');
      expect(req.request.method).toBe("GET");

      req.flush(orders);
      httpMock.verify();

    })));
});