import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email } from '../models/email';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  username = 'User';
  password = '1234567';
  header = {
    headers: {
      Authorization: 'Basic ' + btoa(this.username + ':' + this.password),
    },
  };

  constructor(private httpClient: HttpClient) {}

  urlEmail: string = 'api/email';

  postEmail(email: Email): Observable<Email> {
    return this.httpClient.post<Email>(this.urlEmail, email, this.header);
  }
}
