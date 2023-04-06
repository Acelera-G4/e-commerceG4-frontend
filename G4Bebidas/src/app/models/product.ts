import { Category } from './category';

export class Product {
  productId: number;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: String;
  active: boolean;
  quantity: number = 1;
}
