import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { EmailValidator } from '@angular/forms';
import { ToastService } from 'angular-toastify';

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
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private toast: ToastService
  ) {}

  logar(email: string, password: string) {
    let verifyCart =
      localStorage.getItem('mega_store') == null
        ? null
        : JSON.parse(localStorage.getItem('mega_store')).at(0).cart;
    this.listUserByEmail(email).subscribe({
      next: (response) => {
        if (response.email == email && response.password == password) {
          localStorage.setItem(
            'log',
            JSON.stringify([btoa(response.email), response.userType])
          );
          if (verifyCart == 'true') {
            this.router.navigate(['/cart']);
            this.toast.success('Finalize suas compras');
          } else {
            this.router.navigate(['/home']);
            this.toast.success(`Bem Vindo, ${response.name} `);
          }
        } else {
          if (response.password != password) {
            this.toast.warn('Senha incorreta');
          }
        }
      },
      error: (erro) => {
        console.log('erro', erro);
        erro.status == 404
          ? this.toast.error('Email não cadastrado')
          : this.toast.error('Erro desconhecido, tente novamente mais tarde');
      },
    });
  }

  logado(): boolean {
    return localStorage.getItem('log') ? true : false;
  }

  logout() {
    localStorage.setItem('maiorIdadeCheckbox', 'false');
    localStorage.removeItem('name');
    localStorage.removeItem('log');
    localStorage.removeItem('mega_store');
    this.router.navigate(['/login']);
  }

  listAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.url}`, this.header);
  }

  listUserById(id: number): any {
    return this.httpClient.get<User>(`${this.url}/${id}`, this.header);
  }

  listUserByEmail(email: string): Observable<User> {
    return this.httpClient.get<User>(`${this.url}/email/${email}`, this.header);
  }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.url}`, user, this.header);
  }

  updateUser(user: User): Observable<any> {
    return this.httpClient.put<User[]>(`${this.url}`, user, this.header);
  }

  deleteUserById(id: number): Observable<User> {
    return this.httpClient.delete<User>(`${this.url}/${id}`, this.header);
  }
}
