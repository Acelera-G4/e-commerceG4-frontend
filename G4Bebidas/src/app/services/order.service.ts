import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  username = 'User';
  password = '1234567';
  header = {
    headers: {
      Authorization: 'Basic ' + btoa(this.username + ':' + this.password),
    },
  };
  url: string = 'api/order';
  constructor(private httpClient: HttpClient) {}

  allOrdersList(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${this.url}`, this.header);
  }

  orderById(id: number): Observable<Order> {
    return this.httpClient.get<Order>(`${this.url}/${id}`, this.header);
  }

  createOrUpdateOrder(order: Order): Observable<Order> {
    if (order.id) {
      return this.httpClient.put<Order>(
        `${this.url}/${order.id}`,
        order,
        this.header
      );
    }
    return this.httpClient.post<Order>(`${this.url}`, order, this.header);
  }

  deleteOrder(id: number): Observable<Order> {
    return this.httpClient.delete<Order>(`${this.url}/${id}`, this.header);
  }
}
