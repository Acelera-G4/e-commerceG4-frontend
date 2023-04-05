import { ToastService } from 'angular-toastify';
import { ImageUploadService } from './../../../services/image-upload.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { CategoryService } from './../../../services/category.service';
import { ProductService } from '../../../services/product.service';
import { Category } from './../../../models/category';
import { Product } from './../../../models/product';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Buffer } from 'buffer/';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  product: Product;
  products: Product[] = [];
  filteredProducts: Product[] = [];
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
  isLoading: boolean = true;
  active: boolean = true;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private imageUploadService: ImageUploadService,
    private formBuilder: FormBuilder,
    private toast: ToastService,
    private router: Router
  ) {
    this.product = new Product();
    this.listingProducts = true;
  }

  ngOnInit(): void {
    localStorage.getItem('log') == (null || 'false')
      ? this.router.navigate(['/'])
      : this.router.navigate(['/product']);
    this.isLoading = true;
    this.getProdutos();
    this.getCategories();
    this.listingProducts = true;
    this.productForm = this.formBuilder.group({
      name: [null],
      description: [null],
      price: [null],
      category: [null],
      file: [null],
      active: new FormControl<boolean>(false),
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.categories = response;
        this.categories = this.categories.filter(
          (category) => category.active == true
        );
      },
      error: (error) => (this.error = error),
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
        const product = new Product();
        const category = new Category();
        category.categoryId = this.productForm.value.category;
        product.name = this.productForm.value.name;
        product.description = this.productForm.value.description;
        product.price = this.productForm.value.price;
        product.image = this.imageUrl;
        product.category = category;
        product.active = this.productForm.value.active;
        console.log(this.productForm);
        this.productService.postProduct(product).subscribe({
          next: (response) => {
            this.getProdutos();
            this.displayCreateProduct = false;
          },
          error: (error) => (this.error = error),
        });
      },
      error: (error) => (this.error = error),
    });
  }

  showDialogCreateProduct() {
    this.productForm = this.formBuilder.group({
      name: [null],
      description: [null],
      price: [null],
      category: [null],
      file: [null],
      active: new FormControl<boolean>(false),
    });
    this.displayCreateProduct = true;
  }

  onSelectedProduct(product: Product) {
    this.selectedProduct = product;
  }

  getProdutos() {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response;
        this.size = this.products.length;
        this.isLoading = false;
        this.filterProducts();
      },
      error: (error) => (this.error = error),
    });
    console.log("MENSAGEM PARA O GABRIEL",this.product)
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
        product.active = this.productForm.value.active;
        product.productId = this.productId;
        console.log(this.productForm);
        console.log(product);
        this.toast.success("Atualizado");
        this.productService.putProduct(product).subscribe({
          next: (response) => {

            this.getProdutos();
            this.displayUpdateProduct = false;

          },
          error: (error) => (this.error = error),
        });
      },
      error: (error) => (this.error = error),
    });
    this.productService.putProduct(this.product).subscribe({
      next: (response) => {
        this.product = response;
      },
      error: (error) => (this.error = error),
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
          error: (error) => (this.error = error),
        });
      },
      error: (error) => (this.error = error),
    });
    this.productService.putProduct(this.product).subscribe({
      next: (response) => {
        this.product = response;
      },
      error: (error) => (this.error = error),
    });
  }

  showDialogUpdateProduct(product: Product) {
    this.product = product;
    this.productId = this.product.productId;
    this.displayUpdateProduct = true;
    this.convertImageToBase64(product.image, this.setImage)
    this.productForm = this.formBuilder.group({
      name: [product.name],
      description: [product.description],
      price: [product.price],
      category: [product.category],
      file: [null], //recuperar iga
      active: new FormControl<boolean>(false),
    });
  }

  setImage(value : any) {
    console.log(value);
    //this.file = fetch(value).then(res => res.blob())
    //this.file = new Blob([base64])
    this.productForm = this.formBuilder.group({
      name: [this.product.name],
      description: [this.product.description],
      price: [this.product.price],
      category: [this.product.category.categoryId],
      active: [this.product.active],
      file: [null],
    });
  }

  dataUrlToFile(dataUrl: string, filename: string): File | undefined {
    const arr = dataUrl.split(',');
    if (arr.length < 2) { return undefined; }
    const mimeArr = arr[0].match(/:(.*?);/);
    if (!mimeArr || mimeArr.length < 2) { return undefined; }
    const mime = mimeArr[1];
    const buff = Buffer.from(arr[1], 'base64');
    return new File([buff], filename, {type:mime});
  }

   convertImageToBase64(imgUrl: any, callback: any) {
    const image = new Image();
    image.crossOrigin='anonymous';
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas?.getContext('2d');
      canvas.height = image.naturalHeight;
      canvas.width = image.naturalWidth;
      ctx.drawImage(image, 0, 0);
      const dataUrl = canvas.toDataURL();
      callback && callback(dataUrl)
    }
    image.src = imgUrl;
  }

  deleteProduct(product: Product) {
    product.active = false;
    this.product = product;
    this.productService.putProduct(product).subscribe({
      next: (response) => {
        this.getProdutos();
      },
      error: (error) => (this.error = error),
    });
  }

  compare(val1: any, val2: any) {
    return val1.id === val2.id;
  }

  switchProducts() {
    this.getProdutos();
    this.filterProducts();
  }

  filterProducts() {
    if(this.active == true) {
      this.filteredProducts = this.products.filter(
        (product) => product.active == true
      );
    } else {
      this.filteredProducts = this.products.filter(
        (product) => product.active == false
      );
    }
    console.log(this.filteredProducts);
  } 
}
