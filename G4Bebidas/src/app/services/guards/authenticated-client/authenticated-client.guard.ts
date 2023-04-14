import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../../users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedClientGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
  canActivate() {
    console.log('authent-client', localStorage.getItem('log'));
    if (this.userService.logado()) {
      let detectIsClient =
        localStorage.getItem('log') == null
          ? null
          : localStorage.getItem('log').at(1);
      if (detectIsClient == 'client') {
        this.router.navigate(['/home']);

        return true;
      }
    }
    this.router.navigate(['/login']);
    return false;
  }
}
