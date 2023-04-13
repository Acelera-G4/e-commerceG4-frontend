import { OrderProduct } from './orderProduct';

export class Order {
  id: number;
  numberOrder: number;
  listProducts: OrderProduct[] = [];
  payment: string;
  delivery: boolean;
  clientID: number;
  finished: boolean;
}
