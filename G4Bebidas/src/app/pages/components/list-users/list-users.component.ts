import { Router } from '@angular/router';
import { UserService } from './../../../services/users.service';
import { Component, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user';
import { take } from 'rxjs';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
})
export class ListUsersComponent {
  listUsers: User[] = [];
  displayCreateUser: boolean = false;
  displayAddress: boolean = false;
  displayUpdateUser: boolean = false;
  newUser: User;
  id: number;
  constructor(private userService: UserService, private router: Router) {}

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
    console.log('funfei', user);
    this.displayUpdateUser = true;
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
    this.displayAddress = false;
    console.log('cliquei no ' + this.displayCreateUser);
  }
}
