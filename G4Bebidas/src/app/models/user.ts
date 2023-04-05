import { Address } from "./address";

export class User {
  id: number;
  name: string;
  cpf: string;
  dateOfBirthday: Date;
  email: string;
  userType: string;
  phoneNumber: string;
  password: string;
  active: boolean;
  address: Address[]=[];
}
