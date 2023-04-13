import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { OrderProduct } from 'src/app/models/orderProduct';
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
  orderProduct: OrderProduct[] = [];
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
    let orderProduct = new OrderProduct();
    orderProduct.name = product.name;
    orderProduct.price = product.price;
    orderProduct.IdProduct = product.productId;
    orderProduct.quantity++;
    console.log('orderProduct antes', this.orderProduct);
    let aa = this.orderProduct
      .map((e) => e.IdProduct)
      .includes(product.productId);
    console.log('aa', aa);
    if (aa == true) {
      console.log('foi');
      this.orderProduct.map((e) => {
        if (e.IdProduct == product.productId) e.quantity++;
      });
      console.log('orderProduct', this.orderProduct);
    } else {
      this.orderProduct.push(orderProduct);
      console.log('orderProduct', this.orderProduct);
    }
  }

  decreaseQuantity(product: Product) {
    if (this.showQuantity(product.productId) > 0) {
      let orderProduct = new OrderProduct();
      orderProduct.name = product.name;
      orderProduct.price = product.price;
      orderProduct.IdProduct = product.productId;
      orderProduct.quantity--;
      console.log('orderProduct antes', this.orderProduct);
      let aa = this.orderProduct
        .map((e) => e.IdProduct)
        .includes(product.productId);
      console.log('aa', aa);
      if (aa == true) {
        console.log('foi');
        this.orderProduct.map((e) => {
          if (e.IdProduct == product.productId) e.quantity--;
        });
        console.log('orderProduct', this.orderProduct);
      } else {
        this.orderProduct.push(orderProduct);
        console.log('orderProduct', this.orderProduct);
      }
    }
  }

  showQuantity(productId: number): number {
    let filterQuantityOrderProduct: OrderProduct;
    filterQuantityOrderProduct = this.orderProduct.find(
      (e) => e.IdProduct == productId
    );
    if (filterQuantityOrderProduct == undefined) {
      return 0;
    } else {
      return filterQuantityOrderProduct.quantity;
    }
  }

  addToCart() {}

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
