import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/users.service';
import { ListUsersComponent } from '../list-users/list-users.component';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-modal-update-user',
  templateUrl: './modal-update-user.component.html',
  styleUrls: ['./modal-update-user.component.css'],
})
export class ModalUpdateUserComponent {
  id: number;
  formAddress: FormGroup;
  formUser: FormGroup;
  user: User;
  displayAddress: boolean = false;

  usuario: User;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private addressService: AddressService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.formEmpty();
    this.userService.listUserById(this.id).subscribe({});
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

  updateUser() {}

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
