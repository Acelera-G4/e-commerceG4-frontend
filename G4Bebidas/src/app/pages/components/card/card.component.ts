import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() productId: Product;

  productForm: FormGroup;
  display: boolean = false;
  product: Product;
  productDetails: Product;
  products: Product[] = [];
  cartProductList: Product[] = [];
  size: any;
  error: any;
  isLoading: boolean = true;
  displayProductDetails: boolean = false;
  constructor(
    private productService: ProductService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  increaseQuantity(product: Product) {
    product.quantity++;
    console.log(product);
  }

  decreaseQuantity(product: Product) {
    if (product.quantity > 1) {
      product.quantity--;
    }
  }

  addToCart(product: Product) {
    const existingProduct = this.cartProductList.find(
      (w) => w.productId === product.productId
    );
    if (existingProduct) {
      this.increaseQuantity(existingProduct);
      // this.orderService.createOrUpdateOrder();
      console.log('adicionei', this.cartProductList);
    } else {
      this.cartProductList.push(product);
      console.log('adicionei', this.cartProductList);
    }
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

  showProductDetails(id: number) {
    this.displayProductDetails = true;
    console.log(id);
    this.productService.getProduct(id).subscribe({
      next: (response) => {
        this.productDetails = response;
        console.log(this.productDetails);
      },
      error: (error) => (this.error = error),
    });
  }
}
