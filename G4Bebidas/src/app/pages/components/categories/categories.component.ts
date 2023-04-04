import { Router } from '@angular/router';
import { CategoryService } from './../../../services/category.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Category } from './../../../models/category';
import { ToastService } from 'angular-toastify';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  category: Category;
  categories: Category[] = [];
  filteredCategories: Category[] = [];
  size: number;
  response: any;
  error: any;
  displayCreateCategory: boolean;
  displayUpdateCategory: boolean;
  listingCategories: boolean;
  categoryForm: FormGroup;
  selectedCategory: any;
  listingCategory: boolean;
  activeSwitch: boolean = true;
  active: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private toast: ToastService,
    private router: Router
  ) {
    this.category = new Category();
    this.listingCategory = true;
  }

  ngOnInit(): void {
    localStorage.getItem('log') == (null || 'false')
      ? this.router.navigate(['/'])
      : this.router.navigate(['/category']);

    this.listingCategories = true;
    this.categoryForm = this.formBuilder.group({
      name: [null],
      description: [null],
      activeSwitch: new FormControl<boolean>(false),
      main: new FormControl<boolean>(false),
    });
  }

  postCategory() {
    let category = new Category();
    category.name = this.categoryForm.value.name;
    category.description = this.categoryForm.value.description;
    category.active = this.categoryForm.value.activeSwitch;
    category.main = this.categoryForm.value.main;
    console.log('category ', category);
    this.categoryService.postCategory(category).subscribe({
      next: (response) => {
        this.displayCreateCategory = false;
        this.getCategoriesList();
        this.filterCategories();
      },
      error: (error) => (this.error = error),
    });
  }
  showDialogCreateCategory() {
    this.categoryForm = this.formBuilder.group({
      name: [null],
      description: [null],
      activeSwitch: new FormControl<boolean>(false),
      main: new FormControl<boolean>(false),
    });
    this.displayCreateCategory = true;
  }

  onSelectedCategory(category: Category) {
    this.selectedCategory = category;
  }

  getCategoriesList() {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        console.log('response', response);
        this.categories = response;
        this.filterCategories();
        this.size = this.categories.length;
      },
      error: (error) => (this.error = error),
    });
  }

  putCategory() {
    this.category.name = this.categoryForm.value.name;
    this.category.description = this.categoryForm.value.description;
    this.category.active = this.categoryForm.value.activeSwitch;
    this.category.main = this.categoryForm.value.main;
    this.filterCategories();
    this.categoryService.putCategory(this.category).subscribe({
      next: (response) => {
        this.displayUpdateCategory = false;
      },
      error: (error) => (this.error = error),
    });
  }

  showDialogUpdateCategory(category: Category) {
    this.displayUpdateCategory = true;
    this.category = category;
    this.categoryForm = this.formBuilder.group({
      name: [category.name],
      description: [category.description],
      activeSwitch: [category.active],
      main: [category.main],
    });
  }

  deleteCategory(category: Category) {
    this.category = category;
    this.category.active = false;
    this.category.main = false;
  }

  switchCategories() {
    this.filterCategories();
  }

  filterCategories() {
    if (this.activeSwitch === true || this.activeSwitch == undefined) {
      this.toast.info('Mostrandos os ativos');
      this.filteredCategories = this.categories.filter(
        (category) => category.active == true
      );
    }
    if (this.activeSwitch == false) {
      this.toast.error('Mostrandos os inativos');
      this.filteredCategories = this.categories.filter(
        (category) => category.active == false
      );
    }
  }
}
