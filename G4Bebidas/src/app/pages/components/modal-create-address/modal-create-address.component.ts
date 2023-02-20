import { UserService } from './../../../services/users.service';
import { User } from 'src/app/models/user';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { AddressService } from './../../../services/address.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-modal-create-address',
  templateUrl: './modal-create-address.component.html',
  styleUrls: ['./modal-create-address.component.css'],
})
export class ModalCreateAddressComponent {
  formAddress: FormGroup;
  id: number;
  usuaruo : User

  constructor(
    private formB: FormBuilder,
    private userService: UserService,
    private addressService: AddressService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  testeMatsuda(){
    console.log(this.usuaruo)
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params["id"];
    if (this.id) {
      this.formEmpty();
      this.userService.listUserById(this.id).subscribe({
        next: (date) => {
          this.formfilled(date);
          this.usuaruo = date
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
      user: [null],
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
      user: [user],
    });
  }

  teste() {
    console.log(this.formAddress.value);
  }
}
