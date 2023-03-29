import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { elements } from 'chart.js';
import { LoginModel } from 'src/app/models/login';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/isLoggedIn.service';
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
    private auth: AuthService
  ) {}
  ngOnInit(): void {
    localStorage.getItem('log') == (null || 'false')
      ? this.router.navigate(['/'])
      : this.router.navigate(['/home']);
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
    let iName: any;
    const e = this.formLogin.value;

    let iEmail: any = this.listUsers
      .map((element) => element.email)
      .includes(e.email);
    let iPassword: any = this.listUsers
      .map((element) => element.password)
      .includes(e.password);

    if (iEmail && iPassword) {
      this.toast.success('Bem vindo');
      iEmail = !iEmail;
      iPassword = !iPassword;
      this.auth.login();
      this.router.navigate(['/home']);
    } else {
      if (!iEmail) {
        this.toast.error('email incorreto!');
      }
      if (!iPassword) {
        this.toast.error('senha incorreta!');
      }
    }
    iName = this.listUsers.find((el) => el.email === e.email);

    console.log(e);

    localStorage.setItem('name', iName.name);

    console.log(iName.name);
  }
}
