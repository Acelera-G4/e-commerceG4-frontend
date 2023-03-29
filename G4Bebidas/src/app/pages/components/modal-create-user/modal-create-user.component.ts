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
  displayAddress: boolean = false;

  usuario: User;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private addressService: AddressService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.id) {
      this.formEmpty();
      this.userService.listUserById(this.id).subscribe({});
    } else {
      this.formEmpty();
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
      cep: [null],
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
      cep: [user.address.cep],
    });
    this.formAddress = this.fb.group({
      id: [user.address.id],
      logradouro: [user.address.logradouro],
      complemento: [user.address.complemento],
      localidade: [user.address.localidade],
      bairro: [user.address.bairro],
      uf: [user.address.uf],
    });
  }

  createUser() {
    this.userService.createUser(this.formUser.value).subscribe({
      next: (registered) => {
        console.log('ID ', registered.id);
        this.user = registered;
        console.log(this.user);
        this.displayAddress = true;
      },
      error: (erro) => alert('Preencha todos os campos!'),
    });
  }

  searchCep() {
    const cepForm = this.formUser.value.cep;
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
