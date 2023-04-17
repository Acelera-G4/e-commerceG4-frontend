import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../../users.service';
import { ToastService } from 'angular-toastify';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedClientGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router,
    private toast: ToastService
  ) {}
  canActivate() {
    console.log('authent-client', localStorage.getItem('log'));
    if (this.userService.logado()) {
      let detectIsClient =
        localStorage.getItem('log') == null
          ? null
          : JSON.parse(localStorage.getItem('log')).at(1);

      console.log('authent-client', detectIsClient);
      if (detectIsClient == 'client') {
        // if (verifyCart == 'true') {
        //   this.router.navigate(['/cart']);
        //   this.toast.success('Finalize suas compras');
        // } else {
        this.router.navigate(['/home']);
        return true;
        // }
      }
    }
    this.router.navigate(['/login']);
    return false;
  }
}
