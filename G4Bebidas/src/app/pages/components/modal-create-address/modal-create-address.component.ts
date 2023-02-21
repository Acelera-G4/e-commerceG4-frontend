import { Address } from './../../../models/address';
import { UserService } from './../../../services/users.service';
import { User } from 'src/app/models/user';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { AddressService } from './../../../services/address.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ListUsersComponent } from '../list-users/list-users.component';
@Component({
  selector: 'app-modal-create-address',
  templateUrl: './modal-create-address.component.html',
  styleUrls: ['./modal-create-address.component.css'],
})
export class ModalCreateAddressComponent {
  @Input() userId: number;

  formAddress: FormGroup;
  id: number;
  @Input() user: User;
  addresUser: Address = new Address();

  constructor(
    private formB: FormBuilder,
    private userService: UserService,
    private addressService: AddressService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private listUser: ListUsersComponent
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.formEmpty();
      this.userService.listUserById(this.id).subscribe({
        next: (date) => {
          this.formfilled(date);
          this.user = date;
        },
        error: (error) => console.log('erro', error),
      });
    } else {
      this.formEmpty();
    }
  }

  formEmpty() {
    this.formAddress = this.formB.group({
      id: [null],
      cep: [null],
      street: [null],
      number: [null],
      complement: [null],
      city: [null],
      uf: [null],
      user: [this.user],
    });
  }

  formfilled(user: User) {
    this.formAddress = this.formB.group({
      id: [null],
      cep: [null],
      street: [null],
      number: [null],
      complement: [null],
      city: [null],
      uf: [null],
      user: [this.user],
    });
  }

  createAddress() {
    this.addresUser.cep = this.formAddress.value.cep;
    this.addresUser.street = this.formAddress.value.street;
    this.addresUser.number = this.formAddress.value.number;
    this.addresUser.complement = this.formAddress.value.complement;
    this.addresUser.city = this.formAddress.value.city;
    this.addresUser.uf = this.formAddress.value.uf;
    this.addresUser.user = this.user;

    this.addressService.createAddress(this.addresUser).subscribe({
      next: (registred) => {
        this.userId = registred.id;
        this.addresUser = registred;
        this.closeDialog();
        location.reload();
      },
      error: (erro) => alert('Preencha todos os campos!'),
    });
  }

  closeDialog() {
    this.listUser.closeDialogs();
    
  }
}
