import { ImageUploadService } from './../../../services/image-upload.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CategoryService } from './../../../services/category.service';
import { ProductService } from '../../../services/product.service';
import { Category } from './../../../models/category';
import { Product } from './../../../models/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  product: Product;
  products: Product[] = [];
  categories: Category[];
  size: number;
  error: any;
  displayCreateProduct: boolean;
  displayUpdateProduct: boolean;
  listingProducts: boolean;
  productForm: FormGroup;
  file: any;
  selectedProduct: any;
  imageUrl: String;
  productId: any;


  constructor(private productService: ProductService, private categoryService: CategoryService, private imageUploadService: ImageUploadService, private formBuilder: FormBuilder) {
    this.product = new Product();
    this.listingProducts = true;
  }

  ngOnInit(): void {
    this.getProdutos();
    this.getCategories();
    this.listingProducts = true;
    this.productForm = this.formBuilder.group({
      name: [null],
      description: [null],
      price: [null],
      category: [null],
      file: [null]
    }
    )
  }

  getCategories() {
    this.categoryService
      .getCategories()
      .subscribe({
        next: (response) => {
          this.categories = response;
          this.categories = this.categories.filter(category => category.active == true);
        },
        error: (error) => this.error = error
      });
  }

  closeDialog() {
    this.displayCreateProduct = false;
    this.displayUpdateProduct = false;
  }

  handleUpload(e: any) {
    if (e) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.file = event.target.result.split(',')[1];
        console.log(event.target.result.split(',')[1]);
      };
    }
  }

  postProduct() {
    this.imageUploadService.postImage(this.file).subscribe({
      next: (response) => {
        this.imageUrl = response.data.url;
        console.log(response);
        let product = new Product();
        let category = new Category();
        category.categoryId = this.productForm.value.category;
        product.name = this.productForm.value.name;
        product.description = this.productForm.value.description;
        product.price = this.productForm.value.price;
        product.image = this.imageUrl;
        product.category = category;
        product.active = true;
        console.log(this.productForm);
        this.productService.postProduct(product).subscribe({
          next: (response) => {
            this.getProdutos();
            this.displayCreateProduct = false;
          },
          error: (error) => this.error = error,
        });
      },
      error: (error) => this.error = error,
    });
  }

  showDialogCreateProduct() {
    this.product = new Product();
    this.displayCreateProduct = true;
  }

  onSelectedProduct(product: Product) {
    this.selectedProduct = product;
  }

  getProdutos() {
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

  putProduct() {
    this.imageUploadService.postImage(this.file).subscribe({
      next: (response) => {
        this.imageUrl = response.data.url;
        console.log(response);
        let product = new Product();
        let category = new Category();
        category.categoryId = this.productForm.value.category;
        product.name = this.productForm.value.name;
        product.description = this.productForm.value.description;
        product.price = this.productForm.value.price;
        product.image = this.imageUrl;
        product.category = category;
        product.active = true;
        product.productId = this.productId;
        console.log(this.productForm);
        console.log(product);
        this.productService.putProduct(product).subscribe({
          next: (response) => {
            this.getProdutos();
            this.displayUpdateProduct = false;
          },
          error: (error) => this.error = error,
        });
      },
      error: (error) => this.error = error,
    });
    this.productService
      .putProduct(this.product)
      .subscribe({
        next: (response) => {
          this.product = response;
        },
        error: (error) => this.error = error
      });
  }

  inactiveProduct() {
    this.imageUploadService.postImage(this.file).subscribe({
      next: (response) => {
        this.imageUrl = response.data.url;
        console.log(response);
        let product = new Product();
        let category = new Category();
        category.categoryId = this.productForm.value.category;
        product.name = this.productForm.value.name;
        product.description = this.productForm.value.description;
        product.price = this.productForm.value.price;
        product.image = this.imageUrl;
        product.category = category;
        product.active = true;
        product.productId = this.productId;
        this.productService.putProduct(product).subscribe({
          next: (response) => {
            this.getProdutos();
            this.displayUpdateProduct = false;
          },
          error: (error) => this.error = error,
        });
      },
      error: (error) => this.error = error,
    });
    this.productService
      .putProduct(this.product)
      .subscribe({
        next: (response) => {
          this.product = response;
        },
        error: (error) => this.error = error
      });
  }

  showDialogUpdateProduct(product: Product) {
    this.product = product;
    this.productId = this.product.productId;
    this.displayUpdateProduct = true;
    this.productForm = this.formBuilder.group({
      name: [product.name],
      description: [product.description],
      price: [product.price],
      category: [product.category.categoryId],
      file: [null]
    }
    )
  }

  deleteProduct(product: Product) {
    product.active = false;
    this.product = product;
    this.productService.putProduct(product).subscribe({
      next: (response) => {
        this.getProdutos();
      },
      error: (error) => this.error = error,
    });
  }

  compare(val1: any, val2: any) {
    return val1.id === val2.id;
  }
}
