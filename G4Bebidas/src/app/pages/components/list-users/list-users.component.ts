import { Router } from '@angular/router';
import { UserService } from './../../../services/users.service';
import { Component } from '@angular/core';
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
  displayUpdateUser: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.listAllUsers();
  }

  showDialogCreateUser(){
    console.log("funfei")
    this.displayCreateUser = true;
  }

  showDialogUpdateUser(){
    console.log("funfei")
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
}
