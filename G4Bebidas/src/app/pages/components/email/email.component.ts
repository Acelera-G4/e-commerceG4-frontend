import { Component } from '@angular/core';
import { Email } from 'src/app/models/email';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent {

  email: Email = new Email();

  constructor(private emailService: EmailService){}

  sendEmail(){
    console.log("ENVIEI")
  }

}
