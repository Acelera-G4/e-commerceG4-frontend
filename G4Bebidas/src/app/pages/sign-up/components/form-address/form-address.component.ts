import { AddressService } from './../../../../services/address.service';
import { UserService } from './../../../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-address',
  templateUrl: './form-address.component.html',
  styleUrls: ['./form-address.component.css'],
})
export class FormAddressComponent implements OnInit {
  formAddress: FormGroup;
  id: number;

  constructor(
    private fb: FormBuilder,

    private userService: UserService,
    private addressService: AddressService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.formEmpty();
      this.userService.listUserById(this.id).subscribe({
        next: (prod) => this.formfilled(prod),
        error: (erro) => console.log('errouuuu'),
      });
    } else {
      this.formEmpty();
    }
  }

  formEmpty() {
    this.formAddress = this.fb.group({
      id: [null],
      cep: [null],
      street: [null],
      number: [null],
      complement: [null],
      city: [null],
      uf: [null],
      user: [null],
    });
  }

  formfilled(user: User) {
    this.formAddress = this.fb.group({
      id: [null],
      cep: [null],
      street: [null],
      number: [null],
      complement: [null],
      city: [null],
      uf: [null],
      user: [user],
    });
  }

  teste() {
    console.log(this.formAddress.value);

    this.addressService.createAddress(this.formAddress.value).subscribe({
      next: (ende) => {
        alert('Usuário cadastrado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: (err) => alert('Preencha todos os campos'),
    });
  }
}
