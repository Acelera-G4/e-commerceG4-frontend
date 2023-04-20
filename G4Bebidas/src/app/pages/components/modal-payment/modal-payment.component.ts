import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { UserService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user';
import { Address } from 'src/app/models/address';
import { AddressService } from 'src/app/services/address.service';
import { CreditCard } from 'src/app/models/creditCard';

@Component({
  selector: 'app-modal-payment',
  templateUrl: './modal-payment.component.html',
  styleUrls: ['./modal-payment.component.css'],
})
export class ModalPaymentComponent implements OnInit {
  addressForm: FormGroup;
  creditcardForm: FormGroup;
  selecionado: boolean = true;
  email: string;
  user: User;
  address: Address;
  addressD: Address[] = [];
  creditcard: CreditCard;
  teste: string;
  newAddress: boolean = false;
  paymentMethod: any;
  credCard: boolean = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toast: ToastService,
    private router: Router,
    private addressService: AddressService
  ) {}
  ngOnInit(): void {
    this.email = atob(JSON.parse(localStorage.getItem('log')).at(0));
    console.log('email aq', this.email);
    this.getUser();
    this.formEmpty();
  }
  getUser() {
    this.userService.listUserByEmail(this.email).subscribe({
      next: (value) => {
        if (value.addresses != undefined && value.addresses.length > 0) {
          this.addressD = value.addresses;
          this.selecionado = false;
          this.newAddress = false;
        }
        this.user = value;
        console.log(value.addresses);
      },
    });
  }

  formEmpty() {
    this.creditcardForm = this.formBuilder.group({
      id: [null],
      name: [null],
      cpf: [null],
      dateOfBirthday: [null],
      email: [null],
      userType: [null],
      phoneNumber: [null],
      address: [this.addressForm],
    });
    this.addressForm = this.formBuilder.group({
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
    this.creditcardForm = this.formBuilder.group({
      id: [user.id],
      name: [user.name],
      cpf: [user.cpf],
      dateOfBirthday: [dateOfBirthday],
      email: [user.email],
      userType: [user.userType],
      phoneNumber: [user.phoneNumber],
      address: [this.addressForm],
    });
    this.addressForm = this.formBuilder.group({
      cep: [user.addresses[0].cep],
      logradouro: [user.addresses[0].logradouro],
      complemento: [user.addresses[0].complemento],
      localidade: [user.addresses[0].localidade],
      bairro: [user.addresses[0].bairro],
      uf: [user.addresses[0].uf],
    });
  }

  createAddress() {
    this.user.addresses.push(this.addressForm.value);
    console.log('user', this.user);
    this.userService.updateUser(this.user).subscribe({
      next: (resp) => {
        this.addressD.push(resp.address);
        console.log('resp', resp);
        console.log('this.addressD', this.addressD);
      },
    });
  }

  searchCep() {
    const cepForm = this.addressForm.value.cep;
    this.addressService.buscaCep(cepForm).subscribe({
      next: (response) => {
        this.addressForm.setValue(response);
        console.log(this.addressForm.value);
      },
      error: (error) => console.error(error),
    });

    console.log(cepForm);
  }

  testeButton() {
    console.log('teste', this.teste);
  }
}
