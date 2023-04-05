import { Category } from './category';

export class Product {
  public productId: number;
  public name: string;
  public description: string;
  public price: number;
  public category: Category;
  public image: String;
  public active: boolean = true;
  quantity: number = 1;
}
