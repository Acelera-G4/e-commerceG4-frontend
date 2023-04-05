import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';

@Injectable({ providedIn: 'root' })
export class CreditcardService {
  constructor(private httpClient: HttpClient) {}

  username = 'User';
  password = '1234567';
  header = {
    headers: {
      Authorization: 'Basic ' + btoa(this.username + ':' + this.password),
    },
  };
  url: string = 'api/creditcard';

  allCreditCardsList(): Observable<CreditCard[]> {
    return this.httpClient.get<CreditCard[]>(`${this.url}`, this.header);
  }

  creditCardById(id: number): Observable<CreditCard> {
    return this.httpClient.get<CreditCard>(`${this.url}/${id}`, this.header);
  }

  createOrUpdateCreditCard(creditCard: CreditCard): Observable<CreditCard> {
    if (creditCard.creditcardId) {
      return this.httpClient.put<CreditCard>(
        `${this.url}/${creditCard.creditcardId}`,
        creditCard,
        this.header
      );
    }
    return this.httpClient.post<CreditCard>(
      `${this.url}`,
      CreditCard,
      this.header
    );
  }

  deleteCreditCard(id: number): Observable<CreditCard> {
    return this.httpClient.delete<CreditCard>(`${this.url}/${id}`, this.header);
  }
}
