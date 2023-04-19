import { EmailService } from 'src/app/services/email.service';
import { FormAddressComponent } from './components/form-address/form-address.component';

import { User } from './../../models/user';
import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from 'src/app/services/address.service';
import { UserService } from 'src/app/services/users.service';
import { ListUsersComponent } from '../components/list-users/list-users.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastService } from 'angular-toastify';
import { Email } from 'src/app/models/email';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  @ViewChild(FormAddressComponent)
  child2: FormAddressComponent;

  id: number;
  formUser: FormGroup;
  user: User;
  displayAddress: boolean = false;

  usuario: User;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private toast: ToastService,
    private emailService: EmailService
  ) {}
  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.formEmpty();
  }

  formEmpty() {
    this.formUser = this.fb.group({
      id: [null],
      name: [null],
      cpf: [null],
      dateOfBirthday: [null],
      email: [null],
      userType: ['client'],
      phoneNumber: [null],
      password: [null],
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
      password: [user.password],
    });
  }

  createUser() {
    const user = this.formUser.value;
    // Enviar email de boas-vindas
    let email = new Email();

    email.to.push(user.email);
    email.from = 'bebidas.g4@gmail.com';
    email.subject = 'Bem-vindo ao meu aplicativo';
    email.emailBody =
      '<!DOCTYPE html>\n<html>\n<head>\n\n  <meta charset="utf-8">\n  <meta http-equiv="x-ua-compatible" content="ie=edge">\n  <title>Email Confirmation</title>\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <style type="text/css">\n  /*\n   * Google webfonts. Recommended to include the .woff version for cross-client compatibility.\n   */\n  @media screen {\n    @font-face {\n      font-family: \'Source Sans Pro\';\n      font-style: normal;\n      font-weight: 400;\n      src: local(\'Source Sans Pro Regular\'), local(\'SourceSansPro-Regular\'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format(\'woff\');\n    }\n    @font-face {\n      font-family: \'Source Sans Pro\';\n      font-style: normal;\n      font-weight: 700;\n      src: local(\'Source Sans Pro Bold\'), local(\'SourceSansPro-Bold\'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format(\'woff\');\n    }\n  }\n  /\n   * Avoid browser level font resizing.\n   * 1. Windows Mobile\n   * 2. iOS / OSX\n   */\n  body,\n  table,\n  td,\n  a {\n    -ms-text-size-adjust: 100%; / 1 /\n    -webkit-text-size-adjust: 100%; / 2 /\n  }\n  /\n   * Remove extra space added to tables and cells in Outlook.\n   */\n  table,\n  td {\n    mso-table-rspace: 0pt;\n    mso-table-lspace: 0pt;\n  }\n  /\n   * Better fluid images in Internet Explorer.\n   */\n  img {\n    -ms-interpolation-mode: bicubic;\n  }\n  /\n   * Remove blue links for iOS devices.\n   */\n  a[x-apple-data-detectors] {\n    font-family: inherit !important;\n    font-size: inherit !important;\n    font-weight: inherit !important;\n    line-height: inherit !important;\n    color: inherit !important;\n    text-decoration: none !important;\n  }\n  /\n   * Fix centering issues in Android 4.4.\n   */\n  div[style="margin: 16px 0;"] {\n    margin: 0 !important;\n  }\n  body {\n    width: 100% !important;\n    height: 100% !important;\n    padding: 0 !important;\n    margin: 0 !important;\n  }\n  /**\n   * Collapse table borders to avoid space between cells.\n   */\n  table {\n    border-collapse: collapse !important;\n  }\n  a {\n    color: #1a82e2;\n  }\n  img {\n    height: auto;\n    line-height: 100%;\n    text-decoration: none;\n    border: 0;\n    outline: none;\n  }\n  </style>\n\n</head>\n<body style="background-color: #e9ecef;">\n\n  <!-- start preheader -->\n  <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">\n    Confirme seu email para acessar sua conta na G4Bebidas!\n  </div>\n  <!-- end preheader -->\n\n  <!-- start body -->\n  <table border="0" cellpadding="0" cellspacing="0" width="100%">\n\n    <!-- start logo -->\n    <tr>\n      <td align="center" bgcolor="#e9ecef">\n        <!--[if (gte mso 9)|(IE)]>\n        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">\n        <tr>\n        <td align="center" valign="top" width="600">\n        <![endif]-->\n        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">\n          <tr>\n            <td align="center" valign="top" style="padding: 36px 24px;">\n              <a href="https://www.g4bebidas.com" target="_blank" style="display: inline-block;">\n                <img src="https://i.ibb.co/yk84m09/4bd7f1c8fb0e.png" alt="Logo" border="0" width="48" style="display: block; width: 48px; max-width: 48px; min-width: 48px;">\n              </a>\n            </td>\n          </tr>\n        </table>\n        <!--[if (gte mso 9)|(IE)]>\n        </td>\n        </tr>\n        </table>\n        <![endif]-->\n      </td>\n    </tr>\n    <!-- end logo -->\n\n    <!-- start hero -->\n    <tr>\n      <td align="center" bgcolor="#e9ecef">\n        <!--[if (gte mso 9)|(IE)]>\n        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">\n        <tr>\n        <td align="center" valign="top" width="600">\n        <![endif]-->\n        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">\n          <tr>\n            <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: \'Source Sans Pro\', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">\n              <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Confirme seu Email</h1>\n            </td>\n          </tr>\n        </table>\n        <!--[if (gte mso 9)|(IE)]>\n        </td>\n        </tr>\n        </table>\n        <![endif]-->\n      </td>\n    </tr>\n    <!-- end hero -->\n\n    <!-- start copy block -->\n    <tr>\n      <td align="center" bgcolor="#e9ecef">\n        <!--[if (gte mso 9)|(IE)]>\n        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">\n        <tr>\n        <td align="center" valign="top" width="600">\n        <![endif]-->\n        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">\n\n          <!-- start copy -->\n          <tr>\n            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: \'Source Sans Pro\', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">\n              <p style="margin: 0;">Toque no botão abaixo para confirmar seu endereço de e-mail. Se você não criou uma conta na <a href="https://g4bebidas.com">G4Bebidas</a>, você pode excluir este e-mail.</p>\n            </td>\n          </tr>\n          <!-- end copy -->\n\n          <!-- start button -->\n          <tr>\n            <td align="left" bgcolor="#ffffff">\n              <table border="0" cellpadding="0" cellspacing="0" width="100%">\n                <tr>\n                  <td align="center" bgcolor="#ffffff" style="padding: 12px;">\n                    <table border="0" cellpadding="0" cellspacing="0">\n                      <tr>\n                        <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">\n                          <a href="https://www.blogdesire.com" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: \'Source Sans Pro\', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Verificar Email</a>\n                        </td>\n                      </tr>\n                    </table>\n                  </td>\n                </tr>\n              </table>\n            </td>\n          </tr>\n          <!-- end button -->\n\n          <!-- start copy -->\n          <tr>\n            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: \'Source Sans Pro\', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">\n              <p style="margin: 0;">Se isso não funcionar, copie e cole o seguinte link em seu navegador:</p>\n              <p style="margin: 0;"><a href="https://g4bebidas.com" target="_blank">https://g4bebidas.com/xxx-xxx-xxxx</a></p>\n            </td>\n          </tr>\n          <!-- end copy -->\n\n          <!-- start copy -->\n          <tr>\n            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: \'Source Sans Pro\', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">\n              <p style="margin: 0;">Atenciosamente,<br> G4Bebidas</p>\n            </td>\n          </tr>\n          <!-- end copy -->\n\n        </table>\n        <!--[if (gte mso 9)|(IE)]>\n        </td>\n        </tr>\n        </table>\n        <![endif]-->\n      </td>\n    </tr>\n    <!-- end copy block -->\n\n\n  </table>\n  <!-- end body -->\n\n</body>\n</html>';

    console.log(' EMAIL', email);

    if (!user.name) {
      this.toast.error('Por favor, informe o nome');
      return;
    }
    if (!user.cpf) {
      this.toast.error('Por favor, informe o cpf');
      return;
    }

    if (!user.email) {
      this.toast.error('Por favor, informe o e-mail');
      return;
    }

    if (!user.dateOfBirthday) {
      this.toast.error('Por favor, informe a data de aniversário');
      return;
    }

    if (!user.phoneNumber) {
      this.toast.error('Por favor, informe o telefone');
      return;
    }
    if (!user.password) {
      this.toast.error('Por favor, informe uma senha');
      return;
    }

    this.userService.createUser(this.formUser.value).subscribe({
      next: (cadastrado) => {
        console.log('cadastrado', cadastrado.id);

        this.emailService.postEmail(email).subscribe({
          next: (enviado) => {
            console.log('Email de boas-vindas enviado', enviado);
          },
          error: (erro) => {
            console.log('Erro ao enviar email de boas-vindas', erro);
          },
        });
        this.router.navigate(['/login']);
      },
      error: (erro) =>
        this.toast.error('Existem erros no formulário, corrija-os'),
    });
  }

  teste() {
    console.log('oi');
  }
}
