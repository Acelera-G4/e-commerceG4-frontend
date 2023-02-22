import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url: string = 'http://localhost:8080/user';

  constructor(private httpClient: HttpClient) {}

  listAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.url}`);
  }

  listUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.url}/${id}`);
  }

  deleteUserById(id: number): Observable<User> {
    return this.httpClient.delete<User>(`${this.url}/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.url}`, user);
  }

  
}