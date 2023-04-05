import { OrderProduct } from './orderProduct';

export class Order {
  id: number;
  numberOrder: number;
  orderProduct: OrderProduct[] = [];
  payment: string;
  delivery: boolean;
}
