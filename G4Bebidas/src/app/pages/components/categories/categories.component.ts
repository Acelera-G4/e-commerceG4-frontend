import { Router } from '@angular/router';
import { CategoryService } from './../../../services/category.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Category } from './../../../models/category';
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
  active: boolean = true; 

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.category = new Category();
    this.listingCategory = true;
  }

  ngOnInit(): void {
    localStorage.getItem('log') == (null || 'false')
      ? this.router.navigate(['/'])
      : this.router.navigate(['/category']);
    this.getCategories();
    this.filterCategories();
    this.listingCategories = true;
    this.categoryForm = this.formBuilder.group({
      name: [null],
      description: [null],
      active: new FormControl<boolean>(false),
      main: new FormControl<boolean>(false)
    });
  }

  postCategory() {
    let category = new Category();
    category.name = this.categoryForm.value.name;
    category.description = this.categoryForm.value.description;
    category.active = this.categoryForm.value.active;
    category.main = this.categoryForm.value.main;
    console.log(category);
    this.categoryService.postCategory(category).subscribe({
      next: (response) => {
        this.displayCreateCategory = false;
        this.getCategories();
        this.filterCategories();
      },
      error: (error) => (this.error = error),
    });
  }
  showDialogCreateCategory() {
    this.categoryForm = this.formBuilder.group({
      name: [null],
      description: [null],
      active: new FormControl<boolean>(false),
      main: new FormControl<boolean>(false)
    });
    this.displayCreateCategory = true;
  }

  onSelectedCategory(category: Category) {
    this.selectedCategory = category;
  }

  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.categories = response;
        this.size = this.categories.length;
      },
      error: (error) => (this.error = error),
    });
  }

  putCategory() {
    this.category.name = this.categoryForm.value.name;
    this.category.description = this.categoryForm.value.description;
    this.category.active = this.categoryForm.value.active;
    this.category.main = this.categoryForm.value.main;
    this.categoryService.putCategory(this.category).subscribe({
      next: (response) => {
        this.displayUpdateCategory = false;
      },
      error: (error) => (this.error = error),
    });
  }

  showDialogUpdateCategory(category: Category) {
    this.category = category;
    this.displayUpdateCategory = true;
    this.categoryForm = this.formBuilder.group({
      name: [category.name],
      description: [category.description],
      active: [category.active],
      main: [category.main]
    });
  }

  deleteCategory(category: Category) {
    this.category = category;
    this.category.active = false;
    this.category.main = false;
    this.putCategory();
  }

  switchCategories() {
    this.getCategories();
    this.filterCategories();
  }

  filterCategories() {
    if(this.active == true) {
      this.filteredCategories = this.categories.filter(
        (category) => category.active == true
      );
    } else {
      this.filteredCategories = this.categories.filter(
        (category) => category.active == false
      );
    }
  } 
}
