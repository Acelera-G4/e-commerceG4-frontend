import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { elements } from 'chart.js';
import { tap } from 'rxjs';
import { LoginModel } from 'src/app/models/login';
import { User } from 'src/app/models/user';
import { AuthenticatedClientGuard } from 'src/app/services/guards/authenticated-client/authenticated-client.guard';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login: string;
  password: string;
  listUsers: User[] = [];
  formLogin: FormGroup;
  id: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private activeRouter: ActivatedRoute,
    private toast: ToastService,
    private authenticatedClient: AuthenticatedClientGuard
  ) {}
  ngOnInit(): void {
    // localStorage.getItem('log') == (null || 'false')
    //   ? this.router.navigate(['/'])
    //   : this.router.navigate(['/home']);
    this.listAllUsers();
    this.id = this.activeRouter.snapshot.params['id'];
    if (this.id) {
      this.formEmpty();
      this.userService.listUserById(this.id).subscribe({
        // next: (date) => this.formfilled(date),
        // error: (erro) => console.log('errouuuu', erro),
      });
    } else {
      this.formEmpty();
    }
  }
  listAllUsers() {
    this.userService.listAllUsers().subscribe({
      next: (user) => (this.listUsers = user),
      error: (error) => console.log(error),
    });
  }

  formEmpty() {
    this.formLogin = this.fb.group({
      email: [null],
      password: [null],
    });
  }

  formfilled(login: LoginModel) {
    this.formLogin = this.fb.group({
      login: [login.email],
      password: [login.password],
    });
  }
  loginUser() {
    const e = this.formLogin.value;
    this.userService.logar(e.email, e.password);
  }
}
