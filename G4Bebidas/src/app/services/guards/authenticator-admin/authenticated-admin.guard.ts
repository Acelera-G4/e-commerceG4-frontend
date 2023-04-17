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
  log: boolean = this.userService.logado();
  constructor(private userService: UserService, private router: Router) {}
  canActivate() {
    console.log('authent-admin', JSON.parse(localStorage.getItem('log')));

    if (this.log) {
      console.log('authent-admin-logado', this.log);
      let a = JSON.parse(localStorage.getItem('log'));
      if (a.at(1) == 'admin') {
        console.log('entrei no if do admin');
        return true;
      }
    }
    return false;
  }
}
