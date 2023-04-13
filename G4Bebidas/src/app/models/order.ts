import { OrderProduct } from './orderProduct';

export class Order {
  id: number;
  listProducts: OrderProduct[] = [];
  payment: string = null;
  delivery: boolean = false;
  clientID: number = null;
  finished: boolean = false;
}
