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
export class UnauthenticatedUserGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate() {
    return true;
  }
}
