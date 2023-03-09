import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  public getProducts():Observable<any> {
    return this.http.get('http://localhost:8080/product/all');
  }

  public getProduct(id: Number):Observable<any> {
    return this.http.get(`http://localhost:8080/product/${id}`);
  }

  public postProduct(product: Product):Observable<any> {
    return this.http.post('http://localhost:8080/product', product);
  }

  public putProduct(product: Product):Observable<any> {
    return this.http.put('http://localhost:8080/product', product);
  }

}
