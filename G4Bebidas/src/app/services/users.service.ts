import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  username = 'User';
  password = '1234567';
  url: string = 'api/user';
  header = {
    headers: {
      Authorization: 'Basic ' + btoa(this.username + ':' + this.password),
    },
  };

  constructor(private httpClient: HttpClient) {}

  listAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.url}`, this.header);
  }

  listUserById(id: number): any {
    return this.httpClient.get<User>(`${this.url}/${id}`, this.header);
  }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.url}`, user, this.header);
  }

   updateUser(user: User, id:number): Observable<any> {
    return this.httpClient.put<User[]>(`${this.url}/${id}`, user, this.header);
  }

  deleteUserById(id: number): Observable<User> {
    return this.httpClient.delete<User>(`${this.url}/${id}`, this.header);
  }



}
