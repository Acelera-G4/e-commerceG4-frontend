import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  username = 'User';
  password = '1234567';
  url: string = 'api/product';
  header = {
    headers: {
      Authorization: 'Basic ' + btoa(this.username + ':' + this.password),
    },
  };

  constructor(private http: HttpClient) {}

  public getProducts(): Observable<any> {
    return this.http.get<Product[]>(`${this.url}`, this.header);
  }

  public getProduct(id: Number): Observable<any> {
    return this.http.get<Product[]>(`${this.url}/${id}`, this.header);
  }

  public postProduct(product: Product): Observable<any> {
    return this.http.post<Product[]>(`${this.url}`, product, this.header);
  }

  public putProduct(product: Product): Observable<any> {
    return this.http.put<Product[]>(`${this.url}`, product, this.header);
  }
}
