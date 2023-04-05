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

  constructor(private httpClient: HttpClient) {}

  public buscaCep(cep: string): Observable<any> {
    return this.httpClient.get(`http://viacep.com.br/ws/${cep}/json`);
  }

  listAllAddress(): Observable<Address[]> {
    return this.httpClient.get<Address[]>(
      `${this.urlListAddress}`,
      this.header
    );
  }

  listAddresById(id: number): Observable<Address> {
    return this.httpClient.get<Address>(
      `${this.urlListAddress}/${id}`,
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
    if (address.id) {
      return this.httpClient.put<Address>(
        `${this.urlListAddress}/${address.id}`,
        address,
        this.header
      );
    }

    return this.httpClient.post<Address>(
      `${this.urlListAddress}`,
      address,
      this.header
    );
  }

  public putProduct(address: Address): Observable<any> {
    return this.httpClient.put<Address[]>(`${this.urlListAddress}/${address.id}`, address, this.header);
  }
}
