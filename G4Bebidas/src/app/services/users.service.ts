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

  constructor(private httpClient: HttpClient) {}

  listAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.url}`, {
      headers: {
        Authorization: 'Basic ' + btoa(this.username + ':' + this.password),
      },
    });
  }

  listUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.url}/${id}`);
  }

  deleteUserById(id: number): Observable<User> {
    return this.httpClient.delete<User>(`${this.url}/${id}`);
  }

  createUser(user: User): Observable<User> {
    // console.log('criando usuario');
    return this.httpClient.post<User>(`${this.url}`, user, {
      headers: {
        Authorization: 'Basic ' + btoa(this.username + ':' + this.password),
      },
    });
  }
}
