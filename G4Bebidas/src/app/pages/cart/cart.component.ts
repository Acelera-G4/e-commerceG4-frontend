import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  listOrder: Order[];

  constructor(private router: Router, private orderService: OrderService) {}
  ngOnInit(): void {
    localStorage.getItem('log') == (null || 'false')
      ? this.router.navigate(['/'])
      : this.router.navigate(['/cart']);

    console.log(localStorage.getItem('log'));
    this.getOrderList();
  }

  getOrderList() {
    // this.orderService.allOrdersList().subscribe({
    //   next: (response) => {
    //     this.listOrder = response;
    //     console.log('response', response);
    //   },
    //   error: (err) => console.log(err),
    // });
  }
}
