import { Router } from '@angular/router';
import { UserService } from './../../../services/users.service';
import { Component, Input, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user';
import { take } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
})
export class ListUsersComponent {
  listUsers: User[] = [];
  @Input() displayCreateUser: boolean = false;
  displayAddress: boolean = false;
  displayUpdateUser: boolean = false;
  newUser: User;
  newUserId: any;
  userForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    localStorage.getItem('log') != (null || 'false')
      ? this.router.navigate(['/list-users'])
      : this.router.navigate(['/']);
    this.listAllUsers();
  }

  showDialogCreateUser() {
    console.log('funfei');
    this.displayCreateUser = true;
  }

  showDialogAddress() {
    console.log('funfei');
    this.displayAddress = true;
  }

  showDialogUpdateUser(user: User) {
    this.displayUpdateUser = true;
    this.userForm = this.formBuilder.group({
      id: [user.id],
      name: [user.name],
      cpf: [user.cpf],
      dateOfBirthday: [user.dateOfBirthday],
      email: [user.email],
      userType: [user.userType],
      phoneNumber: [user.phoneNumber],
      address: [user.addresses],
    });
    // console.log(user);
  }

  listAllUsers() {
    this.userService
      .listAllUsers()
      .pipe(take(1))
      .subscribe({
        next: (user) => (this.listUsers = user),
        error: (error) => console.log(error),
      });
  }

  deleteUserById(id: number): void {
    this.userService.deleteUserById(id).subscribe({
      next: (value) => this.listAllUsers(),
      error: (error) => console.log(error),
    });
  }

  closeDialogs() {
    this.displayCreateUser = false;

    console.log('cliquei no ' + this.displayCreateUser);
  }
}
