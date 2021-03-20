import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let productService: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        ProductService
      ],
    });

    productService = TestBed.get(ProductService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it(`should fetch products as an Observable`, (inject([HttpTestingController, ProductService],
    (httpClient: HttpTestingController, productService: ProductService) => {

      const products = [
        {
          "_id": 1,
          "name": "name1",
          "unit_price": 1,
          "stock": 5,
          "currency": "AED",
          "discount": 0
        },
        {
          "_id": 2,
          "name": "name2",
          "unit_price": 1,
          "stock": 5,
          "currency": "AED",
          "discount": 0
        },
      ];


      productService.all()
        .subscribe((products: any) => {
          expect(products.length).toBe(2);
        });

      let req = httpMock.expectOne('http://localhost:8080/api/product/');
      expect(req.request.method).toBe("GET");

      req.flush(products);
      httpMock.verify();

    })));
});