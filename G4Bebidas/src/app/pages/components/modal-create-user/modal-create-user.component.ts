import { Address } from './../../../models/address';
import { UserService } from './../../../services/users.service';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';



@Component({
  selector: 'app-modal-create-user',
  templateUrl: './modal-create-user.component.html',
  styleUrls: ['./modal-create-user.component.css'],
})
export class ModalCreateUserComponent {
  
  

  
  formUser!: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    ) {}
    
    ngOnInit(): void {
      this.formEmpty();
    }
    
    formEmpty() {
      this.formUser = this.fb.group({
        id:[null],
      name: [null],
      cpf: [null],
      dateOfBirthday: [null],
      email: [null],
      userType: [null],
      phoneNumber: [null],
    });
  }

  formfilled(user: User) {
    const dateOfBirthday = new Date(user.dateOfBirthday).toISOString().slice(0, 10).split('-').reverse().join('-');
    this.formUser = this.fb.group({
      id:[user.id],
      name: [user.name],
      cpf: [user.cpf],
      dateOfBirthday: [dateOfBirthday],
      email: [user.email],
      userType: [user.userType],
      phoneNumber: [user.phoneNumber],
    })
  }

  teste() {
    console.log(this.formUser.value);
  }

  createUser() {
    this.userService.createUser(this.formUser.value).subscribe({
      next: (registered) => {
        console.log(registered);
        alert("Cadastrado com sucesso!");
        location.reload();
      },
      error: (erro) => alert("Preencha todos os campos!")
    });
  }


}
