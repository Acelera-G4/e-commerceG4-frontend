import { ProductService } from './../../services/product.service';
import { Product } from './../../models/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { AuthService } from 'src/app/services/isLoggedIn.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  display: boolean = false;
  product: Product;
  products: Product[] = [];
  size: any;
  error: any;

  constructor(
  private productService: ProductService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private toast: ToastService,
    private auth: AuthService
  ) {}

  showDialog() {
    this.display = true;
  }
  closeDialog() {
    this.display = false;
  }

  ngOnInit(): void {
    localStorage.getItem('log') != (null || 'false')
      ? this.router.navigate(['/home'])
      : this.router.navigate(['/']);
    this.showDialog();
    this.getProducts();
  }

  getProducts() {
    this.productService
        .getProducts()
        .subscribe({
          next: (response) => {
            this.products = response;
            this.products = this.products.filter(product => product.active == true);
            this.size = this.products.length;
          },
          error: (error) => this.error = error
        });
  }
}
