import { AddressService } from './../../../services/address.service';
import { Address } from './../../../models/address';
import { UserService } from './../../../services/users.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  user: User;
  listUsers: User[] = [];
  listUsersById: User[] = [];
  listAddress: Address[] = [];
  address: Address;
  size: number;
  error: any;
  displayCreateUser: boolean;
  displayAddress: boolean;
  displayUpdateAddress: boolean;
  displayUpdateUser: boolean;
  userForm: FormGroup;
  Addressform: FormGroup;
  newUser: User;
  newAddress: Address;
  id: number;
  // displayAddress: boolean = false;
  usuario: User;
  userId: any;
  addressid: any;
  isLoading: boolean = true;

  constructor(
    private userService: UserService,
    private addressService: AddressService,
    private formBuilder: FormBuilder,
    private toast: ToastService,
    private router: Router
  ) {
    this.user = new User();
  }

  ngOnInit(): void {
    localStorage.getItem('log') == (null || 'false')
      ? this.router.navigate(['/'])
      : this.router.navigate(['/users']);
    this.isLoading = true;
    this.getUsers();
    // this.getAddres();
    this.userForm = this.formBuilder.group({
      id: [null],
      name: [null],
      cpf: [null],
      dateOfBirthday: [null],
      email: [null],
      userType: [null],
      phoneNumber: [null],
      address: [[null]],
    });
    this.Addressform = this.formBuilder.group({
      id: [null],
      cep: [null],
      street: [null],
      number: [null],
      complement: [null],
      city: [null],
      uf: [null],
    });
  }

  getUsers() {
    this.userService.listAllUsers().subscribe({
      next: (response) => {
        this.listUsers = response;
        this.size = this.listUsers.length;
        this.isLoading = false;
      },
      error: (error) => (this.error = error),
    });
  }

  // getAddres(){
  //   this.addressService.listAllAddress().subscribe({
  //     next:(response)=>{
  //       this.listAddress = response;
  //       this.size = this.listUsers.length;
  //       this.isLoading = false;
  //     },
  //     error:(error) => (this.error = error),
  //   })
  // }

  showDialogCreateUser() {
    this.user = new User();
    this.displayCreateUser = true;
  }

  createUser() {
    const user = new User();
    user.id = this.userForm.value.id;
    user.name = this.userForm.value.name;
    user.cpf = this.userForm.value.cpf;
    user.dateOfBirthday = this.userForm.value.dateOfBirthday;
    user.email = this.userForm.value.email;
    user.userType = this.userForm.value.userType;
    user.phoneNumber = this.userForm.value.phoneNumber;
    user.address = this.userForm.value.address;
    console.log(this.userForm);

    this.userService.createUser(user).subscribe({
      next: (Response) => {
        //CRIAR TRATAMENTO DE ERRO AQUI
        console.log('ID', Response.id);
        this.user = Response;
        this.getUsers();
        this.displayCreateUser = false;
      },
      error: (error) => (this.error = error),
    });
    this.displayAddress = true;
  }

  showDialogUpdateUser(user: User) {
    this.user = user;
    this.userId = this.user.id;
    this.displayUpdateUser = true;
    this.userForm = this.formBuilder.group({
      id: [user.id],
      name: [user.name],
      cpf: [user.cpf],
      dateOfBirthday: [user.dateOfBirthday],
      email: [user.email],
      userType: [user.userType],
      phoneNumber: [user.phoneNumber],
    });
  }

  showDialogUpdateAddress(address: Address) {
    
  }

  updateUser() {
    let newUser = new User();
    newUser.id = this.userForm.value.id;
    newUser.name = this.userForm.value.name;
    newUser.cpf = this.userForm.value.cpf;
    newUser.dateOfBirthday = this.userForm.value.dateOfBirthday;
    newUser.email = this.userForm.value.email;
    newUser.userType = this.userForm.value.userType;
    newUser.phoneNumber = this.userForm.value.phoneNumber;

    this.userService.updateUser(newUser, newUser.id).subscribe({
      next: (response) => {
        //fazer tratamento de erro aqui
        this.getUsers();
        this.displayCreateUser = false;
        this.displayUpdateAddress = true;
        this.listUsersById = this.userService.listUserById(newUser.id);
        console.log('Address', this.listUsersById);
      },
      error: (error) => (this.error = error),
    });
  }

  updateAddress() {
    let newAddres = new Address();
    // this.addressService.
  }

  deleteUserById(id: number) {
    this.userService.deleteUserById(id).subscribe({
      next: (response) => {
        this.getUsers();
      },
      error: (error) => (this.error = error),
    });
  }
}
