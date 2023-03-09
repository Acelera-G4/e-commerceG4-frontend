import { Category } from './../models/category';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {}

  public getCategories():Observable<any> {
    return this.http.get('http://localhost:8080/category/all');
  }

  public getCategory(id: Number):Observable<any> {
    return this.http.get(`http://localhost:8080/category/${id}`);
  }

  public postCategory(category: Category):Observable<any> {
    return this.http.post('http://localhost:8080/category', category);
  }

  public putCategory(category: Category):Observable<any> {
    return this.http.put('http://localhost:8080/category', category);
  }
}
