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
    let cartFull = JSON.parse(localStorage.getItem('mega_store'));
    this.listProducts = cartFull[1];
    this.cart = cartFull.at(0).cart;
    let valueProductsCart = this.listProducts.map((e) => e.price);
    this.total = valueProductsCart.reduce(this.totalPayable);
  }

  totalPayable(total: number, num: number) {
    return total + num;
  }

  home() {
    this.router.navigate(['/home']);
  }

  login() {
    console.log(localStorage.getItem('log'));
    if (
      localStorage.getItem('log') == null ||
      localStorage.getItem('log') == 'false'
    ) {
      console.log('vai para login');
      this.router.navigate(['/login']);
    } else if (localStorage.getItem('log') == 'true') {
      console.log('abre modal para finalizar o pedido');
    } else {
      console.log('erro erro erro');
    }
    // this.router.navigate(['/login'])
  }
}
