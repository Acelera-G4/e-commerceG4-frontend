import { FormAddressComponent } from './components/form-address/form-address.component';

import { User } from './../../models/user';
import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from 'src/app/services/address.service';
import { UserService } from 'src/app/services/users.service';
import { ListUsersComponent } from '../components/list-users/list-users.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  @ViewChild(FormAddressComponent)
  child2: FormAddressComponent;

  id: number;
  formUser: FormGroup;
  user: User;
  displayAddress: boolean = false;

  usuario: User;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private toast: ToastService
  ) {}
  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.formEmpty();
  }

  formEmpty() {
    this.formUser = this.fb.group({
      id: [null],
      name: [null],
      cpf: [null],
      dateOfBirthday: [null],
      email: [null],
      phoneNumber: [null],
      password: [null],
    });
  }

  formfilled(user: User) {
    const dateOfBirthday = new Date(user.dateOfBirthday)
      .toISOString()
      .slice(0, 10)
      .split('-')
      .reverse()
      .join('-');
    this.formUser = this.fb.group({
      id: [user.id],
      name: [user.name],
      cpf: [user.cpf],
      dateOfBirthday: [dateOfBirthday],
      email: [user.email],
      phoneNumber: [user.phoneNumber],
      password: [user.password],
    });
  }

  createUser() {
    const user = this.formUser.value;

    if (!user.name) {
      this.toast.error('Por favor, informe o nome');
      return;
    }
    if (!user.cpf) {
      this.toast.error('Por favor, informe o cpf');
      return;
    }

    if (!user.email) {
      this.toast.error('Por favor, informe o e-mail');
      return;
    }

    if (!user.dateOfBirthday) {
      this.toast.error('Por favor, informe a data de aniversário');
      return;
    }

    if (!user.phoneNumber) {
      this.toast.error('Por favor, informe o telefone');
      return;
    }
    if (!user.password) {
      this.toast.error('Por favor, informe uma senha');
      return;
    }

    this.userService.createUser(this.formUser.value).subscribe({
      next: (cadastrado) => {
        console.log('cadastrado', cadastrado.id);
        this.router.navigate(['/login']);
      },
      error: (erro) => this.toast.error("Existem erros no formulário, corrija-os"),
    });
  }

  teste() {
    console.log('oi');
  }
}
