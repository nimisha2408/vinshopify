import { Component, OnInit, OnDestroy } from '@angular/core';

import {ActivatedRoute, Router } from '@angular/router';

import { Order } from 'src/app/models/order.model';
import { User } from 'src/app/models/user.model';
import { Product } from 'src/app/models/product.model';

import { ProductService } from '../../_services/product.service';
import { OrderService } from '../../_services/order.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders?: Order[];
  products?: Product[];
  users?: User[];
  currentOrder?: Order;
  currentIndex = -1;
  isAddMode?: Boolean;
  id?: String;
  form: any = {
    quantity: null,
    username: null, 
    product: null
  };

  dtOptions: any = {};
  persons: Order[] = [];
  errorMessage = "";

  constructor(
    private productService: ProductService, 
    private userService: UserService, 
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router  
  ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    const { users, products, quantity } = this.form;
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu : [5, 10, 25],
      processing: true
    };

    if(!this.isAddMode) {
      this.getOrder(this.id);
    }
    this.retrieveorders();
    this.retrieveusers();
    this.retrieveproducts();
  }

  getOrder(id?:String): void {
    this.orderService.findOne(id)
      .subscribe(
        data => {
          console.log(data)
          this.form.username = data.id_user;
          this.form.product = data.id_product;
          this.form.quantity = data.quantity;
        },
        error => {
          console.log(error);
      });
  }

  retrieveusers(): void {
    this.userService.all()
      .subscribe(
        data => {
          this.users = data;
        },
        error => {
          console.log(error);
      });
  }

  retrieveproducts(): void {
    this.productService.all()
      .subscribe(
        data => {
          this.products = data;
        },
        error => {
          console.log(error);
      });
  }

  retrieveorders(): void {
    this.orderService.all()
      .subscribe(
        data => {
          this.orders = data;
        },
        error => {
          console.log(error);
      });
  }


  onSubmit(data?:any): void {
    data = {
      product_id: data.product,
      user_id: data.username,
      quantity: data.quantity
    }

    if (this.isAddMode)
      this.orderCreate(data);
    else 
      this.orderUpdate(data);
  }

  orderCreate(data?:any): void {
    this.orderService.create(data)
        .subscribe(
          data => {
            this.orders = data.data;
            this.reloadPage();
          },
          error => {
            this.errorMessage= error.error.message;
        });
  }

  orderUpdate(data?:any): void {
    this.orderService.update(this.id, data)
    .subscribe(
      data => {
        this.orders = data.data;
        this.router.navigate(['/order']);
      },
      error => {
        this.errorMessage= error.error.message;
    });
  }

  orderEdit(id?:String) {
    this.router.navigate(['/order/', id]);
  }

  changeSearch(e?:any) {
    if(e.target.value == '1')
      this.retrieveorders();
    else if(e.target.value == '2')
      this.searchResult('week');
    else
    this.searchResult('day');
  }

  searchResult(key?:String): void {
    this.orderService.searchByDate(key)
      .subscribe(
        data => {
          this.orders = data;
        },
        error => {
          console.log(error);
      });
  }
  
  delete(id?:null): void {
    this.orderService.delete(id)
      .subscribe(
        data => {
          this.reloadPage();
        },
        error => {
          console.log(error);
      });
  }

  reloadPage(): void {
    window.location.reload();
  }

}