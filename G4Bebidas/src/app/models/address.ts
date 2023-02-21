import { User } from 'src/app/models/user';

export class Address {
  id: number;
  cep: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  uf: string;
  user: User;
}
