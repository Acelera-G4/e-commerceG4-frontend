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

  constructor(private router: Router, private orderService: OrderService) {}
  ngOnInit(): void {
    this.getOrderProductList();
  }

  getOrderProductList() {
    let aa = JSON.parse(localStorage.getItem('mega_store'));
    this.listProducts = aa[1];
    this.cart = aa.at(0).cart;
    console.log('cart', this.cart);
    let bb = this.listProducts.map((e) => e.price);
    console.log(bb);

    this.total = bb.reduce(this.totalPayable);
    console.log(this.total);
  }

  totalPayable(total: number, num: number) {
    return total + num;
  }

  home() {
    this.router.navigate(['/']);
  }
}
