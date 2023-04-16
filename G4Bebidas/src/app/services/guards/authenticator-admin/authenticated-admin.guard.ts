import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedAdminGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
  canActivate() {
    console.log('authent-admin', localStorage.getItem('log'));
    if (this.userService.logado()) {
      let a =
        localStorage.getItem('log') == null
          ? null
          : localStorage.getItem('log').at(1);
      if (a == 'admin') {
        this.router.navigate(['/dashboard']);
        return true;
      }
    }
    this.router.navigate(['/login']);
    return false;
  }
}
