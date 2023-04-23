import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { Address } from 'src/app/models/address';
import { User } from 'src/app/models/user';
import { AddressService } from 'src/app/services/address.service';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css'],
})
export class MyAccountComponent implements OnInit {
  private userEmail: string;
  user: User;
  private listUsersById: User;
  private address: Address[];
  userForm: FormGroup;
  addressform: FormGroup;

  constructor(
    private userService: UserService,
    private addressService: AddressService,
    private formBuilder: FormBuilder,
    private toast: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userEmail = localStorage.getItem('mail');
    this.userService.listUserByEmail(this.userEmail).subscribe({
      next: (response) => {
        this.user = response;
        
        
        console.log('User WILL', this.user);
      },
      error: (erro) => console.log(erro),
    });
  }

  
  searchCep() {
    const cepForm = this.addressform.value.cep;
    this.addressService.buscaCep(cepForm).subscribe({
      next: (response) => {
        this.addressform.setValue(response);
        console.log(this.addressform);
      },
      error: (error) => console.error(error),
    });

    console.log(cepForm);
  }
}
