import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { Email } from 'src/app/models/email';
import { User } from 'src/app/models/user';
import { EmailService } from 'src/app/services/email.service';
import { AuthenticatedClientGuard } from 'src/app/services/guards/authenticated-client/authenticated-client.guard';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  passwordForm: FormGroup;
  email: string[];
  userPassword: any;
  emailUser: string;
  listUsers: User[];

  constructor(
    private userService: UserService,
    private toast: ToastService,
    private router: Router,
    private fb: FormBuilder,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {
    this.userService.listAllUsers().subscribe({
      next: (respose) => {
        this.listUsers = respose;
        console.log(this.listUsers);
      },
      error: (erro) => console.log(erro),
    });
    this.passwordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  sendEmail() {
    const emailTo = this.passwordForm.value.email;
    if (this.listUsers) {
      const userEmail = this.listUsers.find((w) => w.email == emailTo);
      if (userEmail) {
        const emailPassword = new Email();
        emailPassword.to.push(emailTo);
        emailPassword.from = 'bebidas.g4@gmail.com';
        emailPassword.subject = 'Resete de senha';
        emailPassword.emailBody = 'resete de senha aqui';

        console.log(' EMAIL', emailPassword);

        this.emailService.postEmail(emailPassword).subscribe({
          next: (enviado) => {
            console.log('Email de resete de senha enviado', enviado);
            this.toast.success('Email de reset de senha enviado');
          },
          error: (erro) => {
            console.log('Erro de reset de senha boas-vindas', erro);
          },
        });
        this.router.navigate(['/login']);
      } else {
        this.toast.error('Email inválido, tente novamente');
      }
    }
  }
}
