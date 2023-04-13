import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { OrderProduct } from 'src/app/models/orderProduct';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() productId: Product;

  display: boolean = false;
  product: Product;
  productDetails: Product;
  products: Product[] = [];
  order: Order;
  orderProduct: OrderProduct[] = [];
  size: any;
  error: any;
  isLoading: boolean = true;
  displayProductDetails: boolean = false;
  navigate: any;
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.getProducts();
    this.verifyProductLocalStorege();
  }

  verifyProductLocalStorege() {
    if (this.orderProduct.length == 0) {
      let verifyProducts = JSON.parse(localStorage.getItem('mega_store'));
      if (verifyProducts.length > 1) {
        this.orderProduct = verifyProducts.at(1);
      }
    }
  }

  increaseQuantity(product: Product) {
    let orderProduct = new OrderProduct();
    orderProduct.name = product.name;
    orderProduct.price = product.price;
    orderProduct.IdProduct = product.productId;
    orderProduct.quantity++;
    let filterQuantityProduct = this.orderProduct
      .map((e) => e.IdProduct)
      .includes(product.productId);
    if (filterQuantityProduct == true) {
      this.orderProduct.map((e) => {
        if (e.IdProduct == product.productId) {
          e.quantity++;
          e.price = product.price * e.quantity;
        }
      });
    } else {
      this.orderProduct.push(orderProduct);
    }
    this.addToCart();
  }

  decreaseQuantity(product: Product) {
    if (this.showQuantity(product.productId) > 0) {
      let orderProduct = new OrderProduct();
      orderProduct.name = product.name;
      orderProduct.IdProduct = product.productId;
      orderProduct.quantity--;
      let filterQuantityProduct = this.orderProduct
        .map((e) => e.IdProduct)
        .includes(product.productId);
      if (filterQuantityProduct == true) {
        this.orderProduct.map((e) => {
          if (e.IdProduct == product.productId) {
            e.quantity--;
            e.price = product.price * e.quantity;
          }
        });
        if (this.orderProduct.some((e) => e.quantity == 0)) {
          console.log('entrando no pop');
          this.removeQuantity();
        }
      }
    }
    this.addToCart();
  }

  removeQuantity() {
    let indexProduct = this.orderProduct.findIndex((e) => e.quantity == 0);
    this.orderProduct.splice(indexProduct, 1);
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

  addToCart() {
    if (this.orderProduct.length > 0) {
      localStorage.setItem(
        'mega_store',
        ` ${JSON.stringify([{ cart: 'true' }, this.orderProduct])}`
      );
    } else {
      localStorage.setItem(
        'mega_store',
        ` ${JSON.stringify([{ cart: 'false' }])}`
      );
    }
  }

  goToCart() {
    this.router.navigate(['/cart']);
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
        console.log(this.products);
      },
      error: (error) => (this.error = error),
    });
  }

  showProductDetails(id: number) {
    this.displayProductDetails = true;
    this.productService.getProduct(id).subscribe({
      next: (response) => {
        this.productDetails = response;
      },
      error: (error) => (this.error = error),
    });
  }
}
