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

  urlListAddress: string = 'http://localhost:8080/address';
  urlListUsers: string = 'http://localhost:8080/users';

  constructor(private httpClient: HttpClient) {}


  listAllUser(): Observable<Address[]> {
    return this.httpClient.get<Address[]>(`${this.urlListUsers}`);
  }

  listAllAddress(): Observable<Address[]> {
    return this.httpClient.get<Address[]>(`${this.urlListAddress}`);
  }

  deleteAddressById(id: number): Observable<Address> {
    return this.httpClient.delete<Address>(`${this.urlListAddress}/${id}`);
  }

  createAddress(address: Address): Observable<Address> {
    return this.httpClient.post<Address>(`${this.urlListAddress}`, address);
  }

  
}
