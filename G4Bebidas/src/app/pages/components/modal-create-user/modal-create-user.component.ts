import { ListUsersComponent } from './../list-users/list-users.component';
import { ModalCreateAddressComponent } from './../modal-create-address/modal-create-address.component';
import { UserService } from './../../../services/users.service';
import { Component, ViewChild, OnInit, Output, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-modal-create-user',
  templateUrl: './modal-create-user.component.html',
  styleUrls: ['./modal-create-user.component.css'],
})
export class ModalCreateUserComponent implements OnInit, AfterViewInit {
  @ViewChild(ModalCreateAddressComponent)
  child: ModalCreateAddressComponent;

  @ViewChild(ListUsersComponent)
  child2: ListUsersComponent;

  id: number;
  formUser: FormGroup;
  user: User;
  displayAddress: boolean = false;

  usuario : User;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activeRouter: ActivatedRoute,
  ) {}
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.id = this.activeRouter.snapshot.params['id'];
    if (this.id) {
      this.formEmpty();
      this.userService.listUserById(this.id).subscribe({
        next: (date) => this.formfilled(date),
        error: (erro) => console.log('errouuuu', erro),
      });
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


}
