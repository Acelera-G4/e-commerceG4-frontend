import { Address } from './address';

export class User {
  id: number;
  name: string;
  cpf: string;
  dateOfBirthday: Date;
  email: string;
  userType: string = 'client';
  phoneNumber: string;
  password: string;
  active: boolean;
  addresses: Address[] = [];
}
