import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  display: boolean = false;
  product: Product;
  products: Product[] = [];
  size: any;
  error: any;
  isLoading: boolean = true;
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response;
        this.products = this.products.filter(
          (product) => product.active == true
        );
        this.size = this.products.length;
        this.isLoading = false;
      },
      error: (error) => (this.error = error),
    });
  }
}
