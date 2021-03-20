import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductService } from '../../_services/product.service';
import { OrderComponent } from './order.component';

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should use the products from the product service", () => {
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
    const quoteService = fixture.debugElement.injector.get(ProductService);
    fixture.detectChanges();
    expect(quoteService.all()).toEqual(products);
  });
});
