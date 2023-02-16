import { UserService } from './../../../services/users.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-modal-create-user',
  templateUrl: './modal-create-user.component.html',
  styleUrls: ['./modal-create-user.component.css'],
})
export class ModalCreateUserComponent {
  displayBasic: boolean = false;

  formUser!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formularioVazio();
  }

  formularioVazio() {
    this.formUser = this.fb.group({
      id: [null],
      name: [null],
      cpf: [null],
      dateOfBirthday: [null],
      email: [null],
      userType: [null],
      phoneNumber: [null],
      address: [null],
    });
  }

  formularioPreenchido(user: User) {
    this.formUser = this.fb.group({
      id: [user.id],
      name: [user],
      cpf: [user],
      dateOfBirthday: [user.dateOfBirthday],
      email: [user.email],
      userType: [user.userType],
      phoneNumber: [user.phoneNumber],
      address: [user.address],
    });
  }

  createUser() {
    this.userService.createUser(this.formUser.value).subscribe({
      next: (createUser) => {
        console.log(createUser);
        alert("Cadastrado com sucesso!");
        this.router.navigate(["/list-users"])
      },
      error: (erro) => alert("Preencha todos os campos!")
    });
  }
}
