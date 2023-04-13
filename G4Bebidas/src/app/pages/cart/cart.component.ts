import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { OrderProduct } from 'src/app/models/orderProduct';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  @Input() id: OrderProduct;

  listOrder: Order[];
  listProduct: OrderProduct;
  listProducts: OrderProduct[] = [];
  cart: boolean;
  total: number;
  visiblePayment: boolean = false;

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.getOrderProductList();
  }

  getOrderProductList() {
    let cartFull = JSON.parse(localStorage.getItem('mega_store'));
    this.listProducts = cartFull[1];
    this.cart = cartFull.at(0).cart;
    this.total = this.listProducts
      .map((e) => e.price)
      .reduce(this.totalPayable);
  }

  totalPayable(num1: number, num2: number) {
    return num1 + num2;
  }

  login() {
    if (
      localStorage.getItem('log') == null ||
      localStorage.getItem('log') == 'false'
    ) {
      this.router.navigate(['/login']);
    } else if (localStorage.getItem('log') == 'true') {
      this.visiblePayment = true;
      console.log('abre modal para finalizar o pedido');
    } else {
      console.log('erro erro erro');
    }
    // this.router.navigate(['/login'])
  }
}
