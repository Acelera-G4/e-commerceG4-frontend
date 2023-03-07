import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isLogIn: boolean;
  constructor(private router: Router) {}
  login() {
    this.isLogIn = true;
    localStorage.setItem('log', JSON.stringify(this.isLogIn));
  }

  logout() {
    this.isLogIn = false;
    localStorage.setItem('log', JSON.stringify(this.isLogIn));
    localStorage.setItem('maiorIdadeCheckbox', 'false');
    localStorage.removeItem('name');
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    localStorage.setItem('log', 'false');
    return this.isLogIn;
  }
}
