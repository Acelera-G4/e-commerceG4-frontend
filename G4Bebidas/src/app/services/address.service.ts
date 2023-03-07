import { UserService } from './users.service';
import { Address } from './../models/address';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private userService: UserService;
  username = 'User';
  password = '1234567';
  header = {
    headers: {
      Authorization: 'Basic ' + btoa(this.username + ':' + this.password),
    },
  };

  urlListAddress: string = 'api/address';
  // urlListUsers: string = 'http://localhost:8080/users';

  constructor(private httpClient: HttpClient) {}

  listAllAddress(): Observable<Address[]> {
    return this.httpClient.get<Address[]>(
      `${this.urlListAddress}`,
      this.header
    );
  }

  deleteAddressById(id: number): Observable<Address> {
    return this.httpClient.delete<Address>(
      `${this.urlListAddress}/${id}`,
      this.header
    );
  }

  createAddress(address: Address): Observable<Address> {
    return this.httpClient.post<Address>(
      `${this.urlListAddress}`,
      address,
      this.header
    );
  }
}
