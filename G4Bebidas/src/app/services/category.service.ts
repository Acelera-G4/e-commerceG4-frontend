import { Category } from './../models/category';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  username = 'User';
  password = '1234567';
  url: string = 'api/category';
  header = {
    headers: {
      Authorization: 'Basic ' + btoa(this.username + ':' + this.password),
    },
  };

  constructor(private http: HttpClient) {}

  public getCategories(): Observable<any> {
    return this.http.get<Category[]>(`${this.url}`, this.header);
  }

  public getCategory(id: Number): Observable<any> {
    return this.http.get<Category[]>(`${this.url}/${id}`, this.header);
  }

  public postCategory(category: Category): Observable<any> {
    return this.http.post<Category[]>(`${this.url}`, category, this.header);
  }

  public putCategory(category: Category): Observable<any> {
    return this.http.put<Category[]>(`${this.url}`, category, this.header);
  }
}
