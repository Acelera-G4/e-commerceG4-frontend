import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { UserService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user';
import { Address } from 'src/app/models/address';
import { AddressService } from 'src/app/services/address.service';
import { CreditCard } from 'src/app/models/creditCard';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { EmailService } from 'src/app/services/email.service';
import { Email } from 'src/app/models/email';

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
  visible: boolean = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toast: ToastService,
    private router: Router,
    private addressService: AddressService,
    private orderService: OrderService,
    private emailService: EmailService
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
      number: [null],
      expiry: [null],
      cvc: [null],
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
    this.visible = true;

    console.log('form card', this.creditcardForm.value);
    console.log('teste', this.teste);
    console.log('metodo de pagamento', this.paymentMethod);
  }

  finishOrder() {
    let order = new Order();
    let email = new Email();
    order.listProducts = JSON.parse(localStorage.getItem('mega_store')).at(1);

    console.log('lista de prod', order.listProducts);

    order.delivery = true;
    order.finished = true;
    order.clientID = this.user.id;
    order.payment = this.paymentMethod;

    console.log('order', order);

    console.log('email email', this.user.email);
    email.to.push(this.user.email);
    email.from = 'bebidas.g4@gmail.com';
    email.subject = 'Boas compras';
    email.emailBody = `${JSON.stringify(order.listProducts)}`;

    this.orderService.createOrUpdateOrder(order).subscribe({
      next: (resp) => {
        localStorage.removeItem('mega_store');
        console.log('resp order', resp);
        this.visible = false;
        this.toast.success('Isso aí... Compre mais');
        this.emailService.postEmail(email).subscribe({
          next: (resp) => {
            console.log('email enviado');
          },
          error: (err) => {
            console.log(err);
          },
        });
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.toast.error('FERROU');
        console.log(err.value);
      },
    });
  }
}
