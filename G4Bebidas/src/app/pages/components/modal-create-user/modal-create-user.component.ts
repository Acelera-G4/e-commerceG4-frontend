import { ListUsersComponent } from './../list-users/list-users.component';
import { AddressService } from 'src/app/services/address.service';

import { UserService } from './../../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-modal-create-user',
  templateUrl: './modal-create-user.component.html',
  styleUrls: ['./modal-create-user.component.css'],
})
export class ModalCreateUserComponent implements OnInit {
  id: number;
  formUser: FormGroup;
  formAddress: FormGroup;
  user: User;
  displayCreateUser: boolean = false;
  usuario: User;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private addressService: AddressService,
    private functionListUsers: ListUsersComponent,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.id) {
      this.formEmpty();
      this.userService.listUserById(this.id).subscribe({});
    } else {
      this.formEmpty();
      let teste = this.formfilled(this.user);
      console.log(teste);
    }
  }

  formEmpty() {
    this.formUser = this.fb.group({
      id: [null],
      name: [null],
      cpf: [null],
      dateOfBirthday: [null],
      email: [null],
      userType: [null],
      phoneNumber: [null],
      address: [this.formAddress],
    });
    this.formAddress = this.fb.group({
      cep: [null],
      logradouro: [null],
      complemento: [null],
      localidade: [null],
      bairro: [null],
      uf: [null],
      ddd: [null],
      gia: [null],
      ibge: [null],
      siafi: [null],
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
      userType: [user.userType],
      phoneNumber: [user.phoneNumber],
      address: [this.formAddress],
    });
    this.formAddress = this.fb.group({
      cep: [user.addresses[0].cep],
      logradouro: [user.addresses[0].logradouro],
      complemento: [user.addresses[0].complemento],
      localidade: [user.addresses[0].localidade],
      bairro: [user.addresses[0].bairro],
      uf: [user.addresses[0].uf],
    });
  }

  createUser() {
    this.userService.createUser(this.formUser.value).subscribe({
      next: (registered) => {
        console.log('ID ', registered.id);
        this.user = registered;
        console.log(this.user);
        this.functionListUsers.closeDialogs();
        this.functionListUsers.listAllUsers();
      },
      error: (erro) => alert('Preencha todos os campos!'),
    });
    console.log(this.formUser);
  }

  searchCep() {
    const cepForm = this.formAddress.value.cep;
    this.addressService.buscaCep(cepForm).subscribe({
      next: (response) => {
        this.formAddress.setValue(response);
        console.log(this.formAddress);
      },
      error: (error) => console.error(error),
    });

    console.log(cepForm);
  }
}
