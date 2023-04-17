import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { OrderProduct } from 'src/app/models/orderProduct';
import { AuthenticatedClientGuard } from 'src/app/services/guards/authenticated-client/authenticated-client.guard';
import { ToastService } from 'angular-toastify';
import { isArray } from 'chart.js/dist/helpers/helpers.core';
import { UserService } from 'src/app/services/users.service';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  @Input() id: OrderProduct;

  listOrder: Order[];
  listProduct: OrderProduct;
  listProducts: OrderProduct[] = [];
  cart: boolean;
  total: number;
  visiblePayment: boolean = false;
  verifyCart: any;

  constructor(
    private router: Router,
    private toast: ToastService,
    private userService: UserService,
    private productService: ProductService
  ) {}
  ngOnInit(): void {
    this.getOrderProductList();
    this.verifyCart =
      localStorage.getItem('mega_store') == null
        ? null
        : JSON.parse(localStorage.getItem('mega_store')).at(0).cart;
  }

  getOrderProductList() {
    let cartFull = JSON.parse(localStorage.getItem('mega_store'));
    this.listProducts = cartFull[1];
    this.cart = cartFull.at(0).cart;
    this.total = this.listProducts
      .map((e) => e.price)
      .reduce(this.totalPayable);
  }

  totalPayable(num1: number, num2: number) {
    return num1 + num2;
  }

  login() {
    this.verifyCart =
      localStorage.getItem('mega_store') == null
        ? null
        : JSON.parse(localStorage.getItem('mega_store')).at(0).cart;
    console.log('verifycart', this.verifyCart);
    if (this.verifyCart == 'true') {
      console.log('localStorage.getItem("log")', localStorage.getItem('log'));
      if (localStorage.getItem('log') == null) {
        this.toast.error('Faça login antes de finalizar a compra');
        this.router.navigate(['/login']);
      } else if (this.userService.logado) {
        this.visiblePayment = true;
        console.log('abre modal para finalizar o pedido');
      } else {
        console.log('erro erro erro');
        this.router.navigate(['/login']);
      }
    } else {
      this.router.navigate(['/home']);
      this.toast.error('carinho vazio');
    }
  }
  decrease(product: OrderProduct) {
    if (this.verifyCart) {
      console.log('tem coisa no carrinho');
      console.log('product id', product.IdProduct);
      let filterQuantityProduct = this.listProducts
        .map((e) => e.IdProduct)
        .includes(product.IdProduct);
      console.log('filter quantity', filterQuantityProduct);
      if (filterQuantityProduct == true) {
        console.log('diminuindo quantidade');
        this.listProducts.map((e) => {
          if (e.IdProduct == product.IdProduct) {
            let getProduct = new Product();
            this.productService.getProduct(product.IdProduct).subscribe({
              next: (response) => {
                getProduct = response;
                console.log('getproductprice', getProduct.price);
                if (e.quantity > 0) e.quantity--;
                e.price = getProduct.price * e.quantity;
                console.log('price total', e.price);
                this.addToCart();
                console.log(
                  'aaaaaaa',
                  this.listProducts.some((e) => e.quantity == 0)
                );
                if (this.listProducts.some((e) => e.quantity == 0)) {
                  console.log('entrando no pop');
                  this.removeQuantity();
                  this.addToCart();
                }
              },
            });
          }
        });
      }
    }
    this.addToCart();
    console.log('carrinho', this.listProducts);
  }

  inclease(product: OrderProduct) {
    if (this.verifyCart) {
      console.log('tem coisa no carrinho');
      console.log('product id', product.IdProduct);
      let filterQuantityProduct = this.listProducts
        .map((e) => e.IdProduct)
        .includes(product.IdProduct);
      console.log('filter quantity', filterQuantityProduct);
      if (filterQuantityProduct == true) {
        console.log('diminuindo quantidade');
        this.listProducts.map((e) => {
          if (e.IdProduct == product.IdProduct) {
            // let getProduct = new Product();
            this.productService.getProduct(product.IdProduct).subscribe({
              next: (response) => {
                e.quantity++;
                e.price = response.price * e.quantity;
                this.addToCart();
              },
            });
            console.log('price total', e.price);
          }
        });
      }
    }
    this.addToCart();
    console.log('carrinho', this.listProducts);
  }

  removeQuantity() {
    let indexProduct = this.listProducts.findIndex((e) => e.quantity == 0);
    this.listProducts.splice(indexProduct, 1);
  }

  addToCart() {
    if (this.listProducts.length > 0) {
      localStorage.setItem(
        'mega_store',
        ` ${JSON.stringify([{ cart: 'true' }, this.listProducts])}`
      );
      this.total = this.listProducts
        .map((e) => e.price)
        .reduce(this.totalPayable);
    } else {
      this.total = 0;
      localStorage.setItem(
        'mega_store',
        ` ${JSON.stringify([{ cart: 'false' }])}`
      );
    }
  }
  removeToCart(product: OrderProduct) {
    console.log('sou um id', product.IdProduct);
    let indexProductRemove = this.listProducts.findIndex(
      (e) => e.IdProduct == product.IdProduct
    );
    this.listProducts.splice(indexProductRemove, 1);
    this.addToCart();
  }
}
